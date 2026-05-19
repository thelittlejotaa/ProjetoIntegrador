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

import br.com.senai.infob.biblioteca.models.Setor;
import br.com.senai.infob.biblioteca.services.SetorService;


@RestController
@RequestMapping("/Setor")
public class SetorController  {
    @Autowired //injção de dependencia
    public SetorService SetorService;
    @GetMapping("/count")
    public Long count(){
        return SetorService.count();
    }
    @PostMapping("/salvar")
    public Setor salvar(@RequestBody Setor Setor){
        return SetorService.salvar(Setor);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = SetorService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Setor atualizar(@PathVariable Integer id, @RequestBody Setor Setor){
        return SetorService.atualizar(Setor, id);
    }

    @GetMapping("/search/{id}")
    public Setor buscar(@PathVariable Integer id){
        return SetorService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Setor> Listar(){
        return SetorService.Listar();
    }

}
