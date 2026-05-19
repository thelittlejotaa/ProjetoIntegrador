package br.com.senai.infob.biblioteca.models;





import java.time.LocalDateTime;
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
@Table(name="deteccao")
public class Deteccao{
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="deteccao_id")
    private int DeteccaoId;

    @Column(name="usando_epi")
    private boolean UsandoEpi;

    @Column(name="Data_hora", columnDefinition = "TIMESTAMP")
    private LocalDateTime DataHora; //mudamos de Timestamp para LocalDateTime pois dava erro 415 o swagger não reconhecia o formato do Timestamp, e o LocalDateTime é mais recomendado para lidar com data e hora no Java

    @ManyToOne
@JoinColumn(name = "funcionario_id")
private Funcionario funcionario;

@ManyToOne
@JoinColumn(name = "camera_id")
private Camera camera;

@ManyToOne
@JoinColumn(name = "epi_id")
private Epi epi;

@ManyToOne
@JoinColumn(name = "maquina_id")
private Maquina maquina;


// @OneToMany(mappedBy = "deteccao")
// @JsonIgnore
// private List<Alerta> alertas;
    public Deteccao() {
    }


    public Deteccao(int deteccaoId, boolean usandoEpi, LocalDateTime dataHora, Funcionario funcionario, Camera camera,
            Epi epi, Maquina maquina) {
        DeteccaoId = deteccaoId;
        UsandoEpi = usandoEpi;
        DataHora = dataHora;
        this.funcionario = funcionario;
        this.camera = camera;
        this.epi = epi;
        this.maquina = maquina;
    }


    public int getDeteccaoId() {
        return DeteccaoId;
    }


    public void setDeteccaoId(int deteccaoId) {
        DeteccaoId = deteccaoId;
    }


    public boolean isUsandoEpi() {
        return UsandoEpi;
    }


    public void setUsandoEpi(boolean usandoEpi) {
        UsandoEpi = usandoEpi;
    }


    public LocalDateTime getDataHora() {
        return DataHora;
    }


    public void setDataHora(LocalDateTime dataHora) {
        DataHora = dataHora;
    }


    public Funcionario getFuncionario() {
        return funcionario;
    }


    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }


    public Camera getCamera() {
        return camera;
    }


    public void setCamera(Camera camera) {
        this.camera = camera;
    }


    public Epi getEpi() {
        return epi;
    }


    public void setEpi(Epi epi) {
        this.epi = epi;
    }


    public Maquina getMaquina() {
        return maquina;
    }


    public void setMaquina(Maquina maquina) {
        this.maquina = maquina;
    }
 

    
}
