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
@Table(name="maquina")
public class Maquina {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="maquina_id")
    private int MaquinaId;
    
    @Column(name="nome")
    private String Nome;

    @Column(name="status")
    private String Status;

        @ManyToOne
    @JoinColumn(name = "setor_id")
    private Setor setor;

    public Maquina() {
    }

    public Maquina(int maquinaId, String nome, String status, Setor setor) {
        MaquinaId = maquinaId;
        Nome = nome;
        Status = status;
        this.setor = setor;
    }

    public int getMaquinaId() {
        return MaquinaId;
    }

    public void setMaquinaId(int maquinaId) {
        MaquinaId = maquinaId;
    }

    public String getNome() {
        return Nome;
    }

    public void setNome(String nome) {
        Nome = nome;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    

    
}
