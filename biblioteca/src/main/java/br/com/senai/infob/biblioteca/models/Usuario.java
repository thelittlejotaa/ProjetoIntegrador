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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="livros")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="usuario_id")
    private int usuarioId;

    @Column(name="nome")
    private String nome;

    @Column(name="senha")
    private String senha;

        @ManyToMany
    @JoinTable(
        name = "usuario_setor",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "setor_id")
    )
    private List<Setor> setores;

    /* *   @OneToMany(mappedBy = "usuario")
    private List<Alerta> alertas;
*/

    public Usuario() {
    }

    public Usuario(int usuarioId, String nome, String senha, List<Setor> setores) {
        this.usuarioId = usuarioId;
        this.nome = nome;
        this.senha = senha;
        this.setores = setores;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Setor> getSetores() {
        return setores;
    }

    public void setSetores(List<Setor> setores) {
        this.setores = setores;
    }
    
    
    
}
