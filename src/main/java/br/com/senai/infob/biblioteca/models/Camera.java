package br.com.senai.infob.biblioteca.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="camera")
public class Camera {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="camera_id")
    private int cameraId;

    @Column(name="localizacao")
    private String localizacao;

        @ManyToOne
    @JoinColumn(name = "setor_id")
    private Setor setor;

      /*   @OneToMany(mappedBy = "camera")
    private List<PrintCamera> prints;
    */

    public Camera() {
    }

    public Camera(int cameraId, String localizacao, Setor setor) {
        this.cameraId = cameraId;
        this.localizacao = localizacao;
        this.setor = setor;
    }

    public int getCameraId() {
        return cameraId;
    }

    public void setCameraId(int cameraId) {
        this.cameraId = cameraId;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }


    
}