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

import br.com.senai.infob.biblioteca.models.Alerta;
import br.com.senai.infob.biblioteca.services.AlertaService;


@RestController
@RequestMapping("/Alerta")
public class AlertaController  {
    @Autowired //injção de dependencia
    public AlertaService AlertaService;
    @GetMapping("/count")
    public Long count(){
        return AlertaService.count();
    }
    @PostMapping("/salvar")
    public Alerta salvar(@RequestBody Alerta Alerta){
        return AlertaService.salvar(Alerta);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = AlertaService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Alerta atualizar(@PathVariable Integer id, @RequestBody Alerta Alerta){
        return AlertaService.atualizar(Alerta, id);
    }

    @GetMapping("/search/{id}")
    public Alerta buscar(@PathVariable Integer id){
        return AlertaService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Alerta> Listar(){
        return AlertaService.Listar();
    }

}
