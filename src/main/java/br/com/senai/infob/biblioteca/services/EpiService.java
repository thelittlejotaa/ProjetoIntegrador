package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Epi;
import br.com.senai.infob.biblioteca.repositories.EpiRepository;

@Service
public class EpiService {
    @Autowired
    public EpiRepository EpiRepository;

    public Long count() {
        return EpiRepository.count();// o . expande oque esta dentro
    }
     public Epi salvar(Epi  Epi){
        return EpiRepository.save(Epi);
     }

     //public void delete(Integer id){
        //EpiRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Epi Epi = EpiRepository.findById(id).get();
      if(Epi!= null){
         EpiRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Epi Epi) {
      EpiRepository.save(Epi);
      return true;
   }
      public Epi atualizar(Epi Epi, Integer id) {
      Epi e = buscar(id);
      if (e != null) {
         Epi.setEpiId(id);
         return EpiRepository.save(Epi);
      }
      return null;
   }
      public Epi buscar(Integer id){
      return EpiRepository.findById(id).get();
   }

   public List<Epi> Listar(){
      return EpiRepository.findAll();
   }
}
