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

import br.com.senai.infob.biblioteca.models.Deteccao;
import br.com.senai.infob.biblioteca.services.DeteccaoService;


@RestController
@RequestMapping("/Deteccao")
public class DeteccaoController  {
    @Autowired //injção de dependencia
    public DeteccaoService DeteccaoService;
    @GetMapping("/count")
    public Long count(){
        return DeteccaoService.count();
    }
    @PostMapping("/salvar")
    public Deteccao salvar(@RequestBody Deteccao Deteccao){
        return DeteccaoService.salvar(Deteccao);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = DeteccaoService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Deteccao atualizar(@PathVariable Integer id, @RequestBody Deteccao Deteccao){
        return DeteccaoService.atualizar(Deteccao, id);
    }

    @GetMapping("/search/{id}")
    public Deteccao buscar(@PathVariable Integer id){
        return DeteccaoService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Deteccao> Listar(){
        return DeteccaoService.Listar();
    }

}
