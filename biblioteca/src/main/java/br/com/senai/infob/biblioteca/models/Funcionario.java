package br.com.senai.infob.biblioteca.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "funcionario")
public class Funcionario {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="funcionario")
    private int FuncionarioId; 

    @Column(name="nomeFuncionario")
    private String NomeFuncionario; 
    
@ManyToMany
@JoinTable(
    name = "funcionario_epi",
    joinColumns = @JoinColumn(name = "funcionario_id"),
    inverseJoinColumns = @JoinColumn(name = "epi_id")
)
private List<Epi> epis;

@ManyToOne
@JoinColumn(name = "setor_id")
private Setor setor;
    public Funcionario() {
    }
    public Funcionario(int funcionarioId, String nomeFuncionario, List<Epi> epis, Setor setor) {
        FuncionarioId = funcionarioId;
        NomeFuncionario = nomeFuncionario;
        this.epis = epis;
        this.setor = setor;
    }
    public int getFuncionarioId() {
        return FuncionarioId;
    }
    public void setFuncionarioId(int funcionarioId) {
        FuncionarioId = funcionarioId;
    }
    public String getNomeFuncionario() {
        return NomeFuncionario;
    }
    public void setNomeFuncionario(String nomeFuncionario) {
        NomeFuncionario = nomeFuncionario;
    }
    public List<Epi> getEpis() {
        return epis;
    }
    public void setEpis(List<Epi> epis) {
        this.epis = epis;
    }
    public Setor getSetor() {
        return setor;
    }
    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    
}
