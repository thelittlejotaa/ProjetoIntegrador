package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.FuncionarioEpi;
import br.com.senai.infob.biblioteca.repositories.FuncionarioEpiRepository;

@Service
public class FuncionarioEpiService {
    @Autowired
    public FuncionarioEpiRepository FuncionarioEpiRepository;

    public Long count() {
        return FuncionarioEpiRepository.count();// o . expande oque esta dentro
    }
     public FuncionarioEpi salvar(FuncionarioEpi  FuncionarioEpi){
        return FuncionarioEpiRepository.save(FuncionarioEpi);
     }

     //public void delete(Integer id){
        //FuncionarioEpiRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      FuncionarioEpi FuncionarioEpi = FuncionarioEpiRepository.findById(id).get();
      if(FuncionarioEpi!= null){
         FuncionarioEpiRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(FuncionarioEpi FuncionarioEpi) {
      FuncionarioEpiRepository.save(FuncionarioEpi);
      return true;
   }
      public FuncionarioEpi atualizar(FuncionarioEpi FuncionarioEpi, Integer id) {
      FuncionarioEpi e = buscar(id);
      if (e != null) {
         FuncionarioEpi.setFuncionarioEpiId(id);
         return FuncionarioEpiRepository.save(FuncionarioEpi);
      }
      return null;
   }
      public FuncionarioEpi buscar(Integer id){
      return FuncionarioEpiRepository.findById(id).get();
   }

   public List<FuncionarioEpi> Listar(){
      return FuncionarioEpiRepository.findAll();
   }
}
