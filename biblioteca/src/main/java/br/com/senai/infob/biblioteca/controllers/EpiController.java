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

import br.com.senai.infob.biblioteca.models.Epi;
import br.com.senai.infob.biblioteca.services.EpiService;


@RestController
@RequestMapping("/Epi")
public class EpiController  {
    @Autowired //injção de dependencia
    public EpiService EpiService;
    @GetMapping("/count")
    public Long count(){
        return EpiService.count();
    }
    @PostMapping("/salvar")
    public Epi salvar(@RequestBody Epi Epi){
        return EpiService.salvar(Epi);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = EpiService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Epi atualizar(@PathVariable Integer id, @RequestBody Epi Epi){
        return EpiService.atualizar(Epi, id);
    }

    @GetMapping("/search/{id}")
    public Epi buscar(@PathVariable Integer id){
        return EpiService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Epi> Listar(){
        return EpiService.Listar();
    }

}
