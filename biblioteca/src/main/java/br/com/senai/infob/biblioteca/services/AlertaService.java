package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Alerta;
import br.com.senai.infob.biblioteca.repositories.AlertaRepository;

@Service
public class AlertaService {
    @Autowired
    public AlertaRepository AlertaRepository;

    public Long count() {
        return AlertaRepository.count();// o . expande oque esta dentro
    }
     public Alerta salvar(Alerta  Alerta){
        return AlertaRepository.save(Alerta);
     }

     //public void delete(Integer id){
        //AlertaRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Alerta Alerta = AlertaRepository.findById(id).get();
      if(Alerta!= null){
         AlertaRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Alerta Alerta) {
      AlertaRepository.save(Alerta);
      return true;
   }
      public Alerta atualizar(Alerta Alerta, Integer id) {
      Alerta e = buscar(id);
      if (e != null) {
         Alerta.setAlertaId(id);
         return AlertaRepository.save(Alerta);
      }
      return null;
   }
      public Alerta buscar(Integer id){
      return AlertaRepository.findById(id).get();
   }

   public List<Alerta> Listar(){
      return AlertaRepository.findAll();
   }
}
