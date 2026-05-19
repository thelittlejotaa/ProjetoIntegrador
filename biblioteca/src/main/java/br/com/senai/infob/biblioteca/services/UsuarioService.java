package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Usuario;
import br.com.senai.infob.biblioteca.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    public UsuarioRepository UsuarioRepository;

    public Long count() {
        return UsuarioRepository.count();// o . expande oque esta dentro
    }
     public Usuario salvar(Usuario  Usuario){
        return UsuarioRepository.save(Usuario);
     }

     //public void delete(Integer id){
        //UsuarioRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Usuario Usuario = UsuarioRepository.findById(id).get();
      if(Usuario!= null){
         UsuarioRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Usuario Usuario) {
      UsuarioRepository.save(Usuario);
      return true;
   }
      public Usuario atualizar(Usuario Usuario, Integer id) {
      Usuario e = buscar(id);
      if (e != null) {
         Usuario.setUsuarioId(id);
         return UsuarioRepository.save(Usuario);
      }
      return null;
   }
      public Usuario buscar(Integer id){
      return UsuarioRepository.findById(id).get();
   }

   public List<Usuario> Listar(){
      return UsuarioRepository.findAll();
   }
}
