package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.PrintCamera;
import br.com.senai.infob.biblioteca.repositories.PrintCameraRepository;

@Service
public class PrintCameraService {
    @Autowired
    public PrintCameraRepository PrintCameraRepository;

    public Long count() {
        return PrintCameraRepository.count();// o . expande oque esta dentro
    }
     public PrintCamera salvar(PrintCamera  PrintCamera){
        return PrintCameraRepository.save(PrintCamera);
     }

     //public void delete(Integer id){
        //PrintCameraRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      PrintCamera PrintCamera = PrintCameraRepository.findById(id).get();
      if(PrintCamera!= null){
         PrintCameraRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(PrintCamera PrintCamera) {
      PrintCameraRepository.save(PrintCamera);
      return true;
   }
      public PrintCamera atualizar(PrintCamera PrintCamera, Integer id) {
      PrintCamera e = buscar(id);
      if (e != null) {
         PrintCamera.setPrintCameraId(id);
         return PrintCameraRepository.save(PrintCamera);
      }
      return null;
   }
      public PrintCamera buscar(Integer id){
      return PrintCameraRepository.findById(id).get();
   }

   public List<PrintCamera> Listar(){
      return PrintCameraRepository.findAll();
   }
}
