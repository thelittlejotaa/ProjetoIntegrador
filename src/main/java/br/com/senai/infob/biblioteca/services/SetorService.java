package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Setor;
import br.com.senai.infob.biblioteca.repositories.SetorRepository;

@Service
public class SetorService {
    @Autowired
    public SetorRepository SetorRepository;

    public Long count() {
        return SetorRepository.count();// o . expande oque esta dentro
    }
     public Setor salvar(Setor  Setor){
        return SetorRepository.save(Setor);
     }

     //public void delete(Integer id){
        //SetorRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Setor Setor = SetorRepository.findById(id).get();
      if(Setor!= null){
         SetorRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Setor Setor) {
      SetorRepository.save(Setor);
      return true;
   }
      public Setor atualizar(Setor Setor, Integer id) {
      Setor e = buscar(id);
      if (e != null) {
         Setor.setSetorId(id);
         return SetorRepository.save(Setor);
      }
      return null;
   }
      public Setor buscar(Integer id){
      return SetorRepository.findById(id).get();
   }

   public List<Setor> Listar(){
      return SetorRepository.findAll();
   }
}
