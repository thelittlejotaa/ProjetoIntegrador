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

import br.com.senai.infob.biblioteca.models.Camera;
import br.com.senai.infob.biblioteca.services.CameraService;


@RestController
@RequestMapping("/Camera")
public class CameraController  {
    @Autowired //injção de dependencia
    public CameraService CameraService;
    @GetMapping("/count")
    public Long count(){
        return CameraService.count();
    }
    @PostMapping("/salvar")
    public Camera salvar(@RequestBody Camera Camera){
        return CameraService.salvar(Camera);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = CameraService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Camera atualizar(@PathVariable Integer id, @RequestBody Camera Camera){
        return CameraService.atualizar(Camera, id);
    }

    @GetMapping("/search/{id}")
    public Camera buscar(@PathVariable Integer id){
        return CameraService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Camera> Listar(){
        return CameraService.Listar();
    }

}
