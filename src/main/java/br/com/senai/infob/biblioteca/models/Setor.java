package br.com.senai.infob.biblioteca.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity 
@Table(name="setor")
public class Setor {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="setor_id")
    private int setorId;

    @Column(name="nome_setor")
    private String nomeSetor;

 /* *  @OneToMany(mappedBy = "setor")
private List<Funcionario> funcionarios;

@OneToMany(mappedBy = "setor")
private List<Epi> epis;

@OneToMany(mappedBy = "setor")
private List<Camera> cameras;

@OneToMany(mappedBy = "setor")
private List<Maquina> maquinas;

@ManyToMany(mappedBy = "setores")
private List<Usuario> usuarios;

*/

    public Setor() {
    }

    public Setor(int setorId, String nomeSetor) {
        this.setorId = setorId;
        this.nomeSetor = nomeSetor;
    }

    public int getSetorId() {
        return setorId;
    }

    public void setSetorId(int setorId) {
        this.setorId = setorId;
    }

    public String getNomeSetor() {
        return nomeSetor;
    }

    public void setNomeSetor(String nomeSetor) {
        this.nomeSetor = nomeSetor;
    }
    

    
}