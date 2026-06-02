package br.com.senai.infob.biblioteca.models;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="PrintCamera")
public class PrintCamera {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="PrintCamera")
    private int PrintCameraId;
    
    @Column(name="Validação")
    private boolean Validação;

    @Column(name="Imagem_path")
    private String ImagemPath;

    @Column(name="Data_hora", columnDefinition = "TIMESTAMP")
    private LocalDateTime dataHora; //mudamos de Timestamp para LocalDateTime pois dava erro 415 no swagger, e o LocalDateTime é mais recomendado para lidar com data e hora no Java

        @ManyToOne
    @JoinColumn(name = "camera_id")
    private Camera camera;
    public PrintCamera() {
    }
    public PrintCamera(int printCameraId, boolean validação, String imagemPath, LocalDateTime dataHora, Camera camera) {
        PrintCameraId = printCameraId;
        Validação = validação;
        ImagemPath = imagemPath;
        this.dataHora = dataHora;
        this.camera = camera;
    }
    public int getPrintCameraId() {
        return PrintCameraId;
    }
    public void setPrintCameraId(int printCameraId) {
        PrintCameraId = printCameraId;
    }
    public boolean isValidação() {
        return Validação;
    }
    public void setValidação(boolean validação) {
        Validação = validação;
    }
    public String getImagemPath() {
        return ImagemPath;
    }
    public void setImagemPath(String imagemPath) {
        ImagemPath = imagemPath;
    }
    public LocalDateTime getDataHora() {
        return dataHora;
    }
    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
    public Camera getCamera() {
        return camera;
    }
    public void setCamera(Camera camera) {
        this.camera = camera;
    }

    
}

