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

import br.com.senai.infob.biblioteca.models.FuncionarioEpi;
import br.com.senai.infob.biblioteca.services.FuncionarioEpiService;


@RestController
@RequestMapping("/FuncionarioEpi")
public class FuncionarioEpiController  {
    @Autowired //injção de dependencia
    public FuncionarioEpiService FuncionarioEpiService;
    @GetMapping("/count")
    public Long count(){
        return FuncionarioEpiService.count();
    }
    @PostMapping("/salvar")
    public FuncionarioEpi salvar(@RequestBody FuncionarioEpi FuncionarioEpi){
        return FuncionarioEpiService.salvar(FuncionarioEpi);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = FuncionarioEpiService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public FuncionarioEpi atualizar(@PathVariable Integer id, @RequestBody FuncionarioEpi FuncionarioEpi){
        return FuncionarioEpiService.atualizar(FuncionarioEpi, id);
    }

    @GetMapping("/search/{id}")
    public FuncionarioEpi buscar(@PathVariable Integer id){
        return FuncionarioEpiService.buscar(id);
    }
    @GetMapping("/listar")
    public List<FuncionarioEpi> Listar(){
        return FuncionarioEpiService.Listar();
    }

}
