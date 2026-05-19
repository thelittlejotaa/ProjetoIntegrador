package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Deteccao;
import br.com.senai.infob.biblioteca.repositories.DeteccaoRepository;

@Service
public class DeteccaoService {
    @Autowired
    public DeteccaoRepository DeteccaoRepository;

    public Long count() {
        return DeteccaoRepository.count();// o . expande oque esta dentro
    }
     public Deteccao salvar(Deteccao  Deteccao){
        return DeteccaoRepository.save(Deteccao);
     }

     //public void delete(Integer id){
        //DeteccaoRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Deteccao Deteccao = DeteccaoRepository.findById(id).get();
      if(Deteccao!= null){
         DeteccaoRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Deteccao Deteccao) {
      DeteccaoRepository.save(Deteccao);
      return true;
   }
      public Deteccao atualizar(Deteccao Deteccao, Integer id) {
      Deteccao e = buscar(id);
      if (e != null) {
         Deteccao.setDeteccaoId(id);
         return DeteccaoRepository.save(Deteccao);
      }
      return null;
   }
      public Deteccao buscar(Integer id){
      return DeteccaoRepository.findById(id).get();
   }

   public List<Deteccao> Listar(){
      return DeteccaoRepository.findAll();
   }
}
