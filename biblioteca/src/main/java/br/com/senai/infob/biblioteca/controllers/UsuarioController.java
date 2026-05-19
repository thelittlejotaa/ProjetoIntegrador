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

import br.com.senai.infob.biblioteca.models.Usuario;
import br.com.senai.infob.biblioteca.services.UsuarioService;


@RestController
@RequestMapping("/Usuario")
public class UsuarioController  {
    @Autowired //injção de dependencia
    public UsuarioService UsuarioService;
    @GetMapping("/count")
    public Long count(){
        return UsuarioService.count();
    }
    @PostMapping("/salvar")
    public Usuario salvar(@RequestBody Usuario Usuario){
        return UsuarioService.salvar(Usuario);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
    boolean deletou = UsuarioService.delete(id);
        if (deletou){
            return "user removido";
        }
        return " falha ao remover";
    }

   @PutMapping("/atualizar/{id}")
    public Usuario atualizar(@PathVariable Integer id, @RequestBody Usuario Usuario){
        return UsuarioService.atualizar(Usuario, id);
    }

    @GetMapping("/search/{id}")
    public Usuario buscar(@PathVariable Integer id){
        return UsuarioService.buscar(id);
    }
    @GetMapping("/listar")
    public List<Usuario> Listar(){
        return UsuarioService.Listar();
    }

}
