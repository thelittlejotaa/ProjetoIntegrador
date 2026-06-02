package br.com.senai.infob.biblioteca.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name="funcionario_epi")
public class FuncionarioEpi {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="FuncionarioEpi_id")
    private int FuncionarioEpiId; 
    
    @Column(name="obrigatorio")
    private boolean Obrigatorio;

    public FuncionarioEpi() {
    }

    public FuncionarioEpi(int funcionarioEpiId, boolean obrigatorio) {
        FuncionarioEpiId = funcionarioEpiId;
        Obrigatorio = obrigatorio;
    }

    public int getFuncionarioEpiId() {
        return FuncionarioEpiId;
    }

    public void setFuncionarioEpiId(int funcionarioEpiId) {
        FuncionarioEpiId = funcionarioEpiId;
    }

    public boolean isObrigatorio() {
        return Obrigatorio;
    }

    public void setObrigatorio(boolean obrigatorio) {
        Obrigatorio = obrigatorio;
    }  
}
