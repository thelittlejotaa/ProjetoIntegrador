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

import br.com.senai.infob.biblioteca.models.PrintCamera;
import br.com.senai.infob.biblioteca.services.PrintCameraService;


@RestController
@RequestMapping("/PrintCamera")
public class PrintCameraController  {
    @Autowired //injção de dependencia
    public PrintCameraService PrintCameraService;
    @GetMapping("/count")
    public Long count(){
        return PrintCameraService.count();
    }
    @PostMapping("/salvar")
    public PrintCamera salvar(@RequestBody PrintCamera PrintCamera){
        return PrintCameraService.salvar(PrintCamera);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = PrintCameraService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public PrintCamera atualizar(@PathVariable Integer id, @RequestBody PrintCamera PrintCamera){
        return PrintCameraService.atualizar(PrintCamera, id);
    }

    @GetMapping("/search/{id}")
    public PrintCamera buscar(@PathVariable Integer id){
        return PrintCameraService.buscar(id);
    }
    @GetMapping("/listar")
    public List<PrintCamera> Listar(){
        return PrintCameraService.Listar();
    }

}
