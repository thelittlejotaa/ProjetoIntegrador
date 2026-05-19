package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Funcionario;
import br.com.senai.infob.biblioteca.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {
    @Autowired
    public FuncionarioRepository FuncionarioRepository;

    public Long count() {
        return FuncionarioRepository.count();// o . expande oque esta dentro
    }
     public Funcionario salvar(Funcionario  Funcionario){
        return FuncionarioRepository.save(Funcionario);
     }

     //public void delete(Integer id){
        //FuncionarioRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Funcionario Funcionario = FuncionarioRepository.findById(id).get();
      if(Funcionario!= null){
         FuncionarioRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Funcionario Funcionario) {
      FuncionarioRepository.save(Funcionario);
      return true;
   }
      public Funcionario atualizar(Funcionario Funcionario, Integer id) {
      Funcionario e = buscar(id);
      if (e != null) {
         Funcionario.setFuncionarioId(id);
         return FuncionarioRepository.save(Funcionario);
      }
      return null;
   }
      public Funcionario buscar(Integer id){
      return FuncionarioRepository.findById(id).get();
   }

   public List<Funcionario> Listar(){
      return FuncionarioRepository.findAll();
   }
}
