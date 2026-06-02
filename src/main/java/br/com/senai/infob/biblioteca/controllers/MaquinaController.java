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

import br.com.senai.infob.biblioteca.models.Maquina;
import br.com.senai.infob.biblioteca.services.MaquinaService;


@RestController
@RequestMapping("/Maquina")
public class MaquinaController  {
    @Autowired //injção de dependencia
    public MaquinaService MaquinaService;
    @GetMapping("/count")
    public Long count(){
        return MaquinaService.count();
    }
    @PostMapping("/salvar")
    public Maquina salvar(@RequestBody Maquina Maquina){
        return MaquinaService.salvar(Maquina);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = MaquinaService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Maquina atualizar(@PathVariable Integer id, @RequestBody Maquina Maquina){
        return MaquinaService.atualizar(Maquina, id);
    }

    @GetMapping("/search/{id}")
    public Maquina buscar(@PathVariable Integer id){
        return MaquinaService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Maquina> Listar(){
        return MaquinaService.Listar();
    }

}
