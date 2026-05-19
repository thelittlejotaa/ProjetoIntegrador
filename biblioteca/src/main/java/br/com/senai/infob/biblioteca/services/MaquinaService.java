package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Maquina;
import br.com.senai.infob.biblioteca.repositories.MaquinaRepository;

@Service
public class MaquinaService {
    @Autowired
    public MaquinaRepository MaquinaRepository;

    public Long count() {
        return MaquinaRepository.count();// o . expande oque esta dentro
    }
     public Maquina salvar(Maquina  Maquina){
        return MaquinaRepository.save(Maquina);
     }

     //public void delete(Integer id){
        //MaquinaRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Maquina Maquina = MaquinaRepository.findById(id).get();
      if(Maquina!= null){
         MaquinaRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Maquina Maquina) {
      MaquinaRepository.save(Maquina);
      return true;
   }
      public Maquina atualizar(Maquina Maquina, Integer id) {
      Maquina e = buscar(id);
      if (e != null) {
         Maquina.setMaquinaId(id);
         return MaquinaRepository.save(Maquina);
      }
      return null;
   }
      public Maquina buscar(Integer id){
      return MaquinaRepository.findById(id).get();
   }

   public List<Maquina> Listar(){
      return MaquinaRepository.findAll();
   }
}
