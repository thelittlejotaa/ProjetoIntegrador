package br.com.senai.infob.biblioteca.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "epi")
public class Epi {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="epi_id")
    private int epiId;

    @Column(name="nome")
    private String nome;

    @Column(name="categoria")
    private String categoria;

    @Column(name="Quantidade_total")
    private int QuantidadeTotal;

    @Column(name="Quantidade_disponivel")
    private int QuantidadeDisponnivel;

       /* / @ManyToMany(mappedBy = "epis")
    private List<Funcionario> funcionarios;
    /* */

        @ManyToOne
    @JoinColumn(name = "setor_id")
    private Setor setor;
    public Epi() {
    }
    public Epi(int epiId, String nome, String categoria, int quantidadeTotal, int quantidadeDisponnivel, Setor setor) {
        this.epiId = epiId;
        this.nome = nome;
        this.categoria = categoria;
        QuantidadeTotal = quantidadeTotal;
        QuantidadeDisponnivel = quantidadeDisponnivel;
        this.setor = setor;
    }
    public int getEpiId() {
        return epiId;
    }
    public void setEpiId(int epiId) {
        this.epiId = epiId;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public int getQuantidadeTotal() {
        return QuantidadeTotal;
    }
    public void setQuantidadeTotal(int quantidadeTotal) {
        QuantidadeTotal = quantidadeTotal;
    }
    public int getQuantidadeDisponnivel() {
        return QuantidadeDisponnivel;
    }
    public void setQuantidadeDisponnivel(int quantidadeDisponnivel) {
        QuantidadeDisponnivel = quantidadeDisponnivel;
    }
    public Setor getSetor() {
        return setor;
    }
    public void setSetor(Setor setor) {
        this.setor = setor;
    }
    

    
}
