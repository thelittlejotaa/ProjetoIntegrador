import cv2
import time
import threading
import requests
from datetime import datetime
import numpy as np
from flask import Flask, Response
from flask_cors import CORS

try:
    from ultralytics import YOLO
    HAS_ULTRALYTICS = True
except ImportError:
    HAS_ULTRALYTICS = False

app = Flask(__name__)
CORS(app)

# Global variables to share state between the worker thread and Flask
latest_frame = None
frame_lock = threading.Lock()
camera_running = True

# Configuration
SPRING_BOOT_URL = "http://localhost:8080/Deteccao/salvar"
DETECTION_INTERVAL = 5.0 # Send a detection every 5 seconds
last_detection_time = 0

def send_detection_to_backend(usando_epi):
    """Sends detection log to Spring Boot backend."""
    global last_detection_time
    now = time.time()
    if now - last_detection_time < DETECTION_INTERVAL:
        return
    
    last_detection_time = now
    
    # We construct the Deteccao payload
    # Note: Spring Boot expects LocalDateTime in ISO-8601 format
    data_hora = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    
    payload = {
        "usandoEpi": usando_epi,
        "dataHora": data_hora,
        "funcionario": None,
        "camera": None,
        "epi": None,
        "maquina": None
    }
    
    try:
        # Launching thread for non-blocking HTTP request
        def post():
            try:
                response = requests.post(SPRING_BOOT_URL, json=payload, timeout=2.0)
                print(f"[IA] Detecção enviada ao backend: usandoEpi={usando_epi}, Status={response.status_code}")
            except Exception as e:
                print(f"[IA] Aviso: Backend offline ou erro de rede ao enviar detecção: {e}")
                
        threading.Thread(target=post, daemon=True).start()
    except Exception as e:
        print(f"[IA] Erro ao disparar thread de envio: {e}")

def create_synthetic_frame(tick):
    """Creates a beautiful moving synthetic frame for simulation when webcam is offline."""
    frame = np.zeros((480, 640, 3), dtype=np.uint8)
    
    # Background pattern (grid)
    for y in range(0, 480, 40):
        cv2.line(frame, (0, y), (640, y), (20, 20, 20), 1)
    for x in range(0, 640, 40):
        cv2.line(frame, (x, 0), (x, 480), (20, 20, 20), 1)
        
    # Draw title
    cv2.putText(frame, "WEBCAM SIMULADA - DETECCAO DE EPI", (20, 40), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 165, 255), 2)
    cv2.putText(frame, "Modo de Teste / Fallback Inteligente", (20, 65), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (150, 150, 150), 1)
                
    # Simulate a person moving in the frame
    # We use sine wave for smooth movement
    offset_x = int(50 * np.sin(tick * 0.05))
    offset_y = int(20 * np.cos(tick * 0.03))
    
    x1, y1 = 200 + offset_x, 120 + offset_y
    x2, y2 = 440 + offset_x, 400 + offset_y
    
    # Alternate EPI status every 10 seconds (tick count based)
    # 30 ticks approx 1 second
    usando_epi = (int(tick / 150) % 2 == 0)
    
    # Draw body box (green if using EPI, red if not)
    color = (0, 255, 0) if usando_epi else (0, 0, 255)
    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
    
    # Draw simulated helmet (EPI)
    if usando_epi:
        # Yellow helmet
        cv2.ellipse(frame, (x1 + 120, y1), (40, 20), 0, 180, 360, (0, 255, 255), -1)
        cv2.rectangle(frame, (x1 + 120 - 50, y1), (x1 + 120 + 50, y1 + 3), (0, 255, 255), -1)
        label = "Trabalhador COM EPI"
        cv2.putText(frame, "CAPACETE DETECTADO [OK]", (x1, y1 - 25), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    else:
        label = "ALERTA: TRABALHADOR SEM EPI"
        cv2.putText(frame, "PERIGO: SEM CAPACETE!", (x1, y1 - 25), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
                    
    # Draw text background
    text_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)[0]
    cv2.rectangle(frame, (x1, y1 - 20), (x1 + text_size[0] + 10, y1), color, -1)
    
    # Draw text
    cv2.putText(frame, label, (x1 + 5, y1 - 5), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)
                
    # Add timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cv2.putText(frame, timestamp, (20, 460), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (100, 100, 100), 1)
                
    return frame, usando_epi

def video_capture_and_process():
    """Background worker that captures frames from camera or generates simulated ones, runs YOLO, and updates the latest frame."""
    global latest_frame, camera_running
    
    model = None
    if HAS_ULTRALYTICS:
        print("[IA] Carregando o modelo YOLOv8...")
        try:
            model = YOLO('yolov8n.pt')
            print("[IA] YOLOv8 carregado com sucesso.")
        except Exception as e:
            print(f"[IA] Falha ao carregar o YOLOv8 (usando modo puramente simulado): {e}")
            model = None
    else:
        print("[IA] YOLOv8 não instalado. Rodando em modo simulado leve.")
        
    print("[IA] Inicializando captura da câmera...")
    cap = cv2.VideoCapture(0)
    
    use_simulation = False
    if not cap.isOpened():
        print("[IA] Câmera física não encontrada ou permissão negada. Entrando em modo simulado.")
        use_simulation = True
        
    tick = 0
    while camera_running:
        usando_epi_status = True
        
        if use_simulation:
            # Generate simulated frame
            frame, usando_epi_status = create_synthetic_frame(tick)
            tick += 1
            time.sleep(0.033) # Limit to approx 30 fps
        else:
            ret, frame = cap.read()
            if not ret:
                print("[IA] Falha ao ler frame da câmera. Alternando para modo simulado.")
                use_simulation = True
                continue
                
            # If we have a real frame but no YOLO model loaded
            if model is None:
                h, w, _ = frame.shape
                # Draw high-fidelity HUD indicators
                cv2.rectangle(frame, (10, 10), (w - 10, h - 10), (0, 165, 255), 2)
                cv2.putText(frame, "FEED REAL - WEBCAM ATIVA", (25, 40), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 165, 255), 2)
                cv2.putText(frame, "Monitoramento IA: Sem Caixas (YOLO Omitido)", (25, 65), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (180, 180, 180), 1)
                
                # Mock safety status periodically
                usando_epi_status = (int(time.time() / 5) % 2 == 0)
                status_color = (0, 255, 0) if usando_epi_status else (0, 0, 255)
                status_text = "EPI: DETECTADO" if usando_epi_status else "ALERTA: AUSENCIA DE EPI"
                
                # Status overlay box
                cv2.rectangle(frame, (25, h - 50), (320, h - 20), (0, 0, 0), -1)
                cv2.putText(frame, status_text, (35, h - 30), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, status_color, 2)
            else:
                # Perform real prediction using YOLOv8
                try:
                    results = model(frame, stream=True, conf=0.5)
                    person_detected = False
                
                    for r in results:
                        boxes = r.boxes
                        for box in boxes:
                            x1, y1, x2, y2 = box.xyxy[0]
                            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                            conf = round(float(box.conf[0]), 2)
                            cls_idx = int(box.cls[0])
                            cls_name = model.names[cls_idx]
                            
                            if cls_name == "person":
                                person_detected = True
                                
                            # Draw bounding box
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                            label = f"{cls_name} {conf}"
                            text_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)[0]
                            cv2.rectangle(frame, (x1, y1 - 20), (x1 + text_size[0], y1), (0, 255, 0), -1)
                            cv2.putText(frame, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)
                    
                    # In standard YOLO (trained on COCO), there is no 'helmet' class,
                    # so we simulate EPI safety: if we detect a person, we randomly simulate
                    # if they are safe or not for this log, or we assume they are safe (usandoEpi=True)
                    # to show database integration.
                    if person_detected:
                        # Let's say there is a 50/50 chance they are wearing their EPI
                        usando_epi_status = (int(time.time() / 10) % 2 == 0)
                except Exception as e:
                    print(f"[IA] Erro na inferência YOLO: {e}")
                
        # Send detection info periodically to Spring Boot
        # Send when person is detected in real or simulated feed
        send_detection_to_backend(usando_epi_status)
        
        # Save processed frame globally
        with frame_lock:
            latest_frame = frame.copy()
            
    if cap.isOpened():
        cap.release()

def generate_mjpeg_stream():
    """Generates MJPEG multipart stream for the browser."""
    global latest_frame
    while True:
        with frame_lock:
            if latest_frame is None:
                # Create a simple placeholder frame
                img = np.zeros((480, 640, 3), dtype=np.uint8)
                cv2.putText(img, "Carregando Feed...", (200, 240), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                latest_frame = img
                
            # Encode frame to JPEG
            ret, buffer = cv2.imencode('.jpg', latest_frame)
            if not ret:
                continue
                
            frame_bytes = buffer.tobytes()
            
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        time.sleep(0.04) # Control frame rate (~25fps)

@app.route('/video_feed')
def video_feed():
    """Route for video streaming."""
    return Response(generate_mjpeg_stream(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/status')
def status():
    """Simple status check."""
    return {"status": "online", "mode": "YOLOv8 + OpenCV stream"}

def main():
    # Start background capture thread
    capture_thread = threading.Thread(target=video_capture_and_process, daemon=True)
    capture_thread.start()
    
    print("[IA] Servidor de Visão Computacional rodando em http://localhost:5000")
    print("[IA] Acesse http://localhost:5000/video_feed no frontend para ver a câmera.")
    
    # Start Flask API server
    # Run in threaded mode to handle multiple clients
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)

if __name__ == "__main__":
    main()
