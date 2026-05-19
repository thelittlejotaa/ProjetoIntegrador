import cv2
from ultralytics import YOLO

def main():
    # Carrega o modelo YOLOv8.
    # O modelo 'yolov8n.pt' é o mais leve e detecta pessoas, carros, etc.
    # Para detectar EPIs (capacetes, máscaras, etc.), você precisa colocar o caminho 
    # de um modelo treinado para EPIs aqui (ex: 'epi_model.pt').
    print("Carregando o modelo YOLO...")
    model = YOLO('yolov8n.pt') 
    
    # Inicia a captura de vídeo da webcam padrão (índice 0)
    print("Iniciando a webcam...")
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Erro ao abrir a webcam. Verifique se a câmera está conectada e permitida.")
        return

    print("Pressione 'q' na janela de vídeo para sair.")

    while True:
        # Lê o frame da webcam
        ret, frame = cap.read()
        
        if not ret:
            print("Erro ao ler o frame da webcam.")
            break

        # Faz a predição no frame atual
        # stream=True otimiza a memória, e conf=0.5 filtra detecções fracas
        results = model(frame, stream=True, conf=0.5)

        # Para cada detecção na lista de resultados
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Extrai as coordenadas da bounding box
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                # Confiança e Classe
                conf = round(float(box.conf[0]), 2)
                cls_idx = int(box.cls[0])
                cls_name = model.names[cls_idx]

                # Desenha a caixa no frame (cor verde, espessura 2)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                
                # Prepara o texto
                label = f"{cls_name} {conf}"
                
                # Desenha um fundo para o texto ficar legível
                text_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)[0]
                cv2.rectangle(frame, (x1, y1 - 20), (x1 + text_size[0], y1), (0, 255, 0), -1)
                
                # Coloca o texto
                cv2.putText(frame, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

        # Mostra o frame na tela
        cv2.imshow("Deteccao de EPIs (Visao Computacional)", frame)

        # Se apertar a tecla 'q', sai do loop
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Libera a câmera e fecha a janela
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
