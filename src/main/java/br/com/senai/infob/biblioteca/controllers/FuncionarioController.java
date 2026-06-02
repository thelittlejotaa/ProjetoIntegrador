package br.com.senai.infob.biblioteca.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.senai.infob.biblioteca.models.Funcionario;
import br.com.senai.infob.biblioteca.services.FuncionarioService;


@RestController
@RequestMapping("/Funcionario")
public class FuncionarioController  {
    @Autowired //injção de dependencia
    public FuncionarioService FuncionarioService;
    @GetMapping("/count")
    public Long count(){
        return FuncionarioService.count();
    }
    @PostMapping("/salvar")
    public Funcionario salvar(@RequestBody Funcionario Funcionario){
        return FuncionarioService.salvar(Funcionario);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = FuncionarioService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Funcionario atualizar(@PathVariable Integer id, @RequestBody Funcionario Funcionario){
        return FuncionarioService.atualizar(Funcionario, id);
    }

    @GetMapping("/search/{id}")
    public Funcionario buscar(@PathVariable Integer id){
        return FuncionarioService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Funcionario> Listar(){
        return FuncionarioService.Listar();
    }
}
