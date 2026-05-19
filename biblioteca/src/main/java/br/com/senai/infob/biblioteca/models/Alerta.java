package br.com.senai.infob.biblioteca.models;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="alerta")
public class Alerta {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="alerta")
    private int alertaId;

    @Column(name="status")
    private int statusId;

        @ManyToOne
    @JoinColumn(name = "deteccao_id")
    private Deteccao deteccao;

        @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    public Alerta() {
    }
    public Alerta(int alertaId, int statusId, Deteccao deteccao, Usuario usuario) {   // Adicionamos o parâmetro Usuario e Deteccao, pois estavam faltando e são necessários para criar um alerta completo
        this.alertaId = alertaId;  
        this.statusId = statusId;
        this.deteccao = deteccao;
        this.usuario = usuario;
    }
    public int getAlertaId() {
        return alertaId;
    }
    public void setAlertaId(int alertaId) {
        this.alertaId = alertaId;
    }
    public int getStatusId() {
        return statusId;
    }
    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }
    public Deteccao getDeteccao() {
        return deteccao;
    }
    public void setDeteccao(Deteccao deteccao) {
        this.deteccao = deteccao;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


}
