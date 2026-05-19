package br.com.senai.infob.biblioteca.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.senai.infob.biblioteca.models.Camera;
import br.com.senai.infob.biblioteca.repositories.CameraRepository;

@Service
public class CameraService {
    @Autowired
    public CameraRepository CameraRepository;

    public Long count() {
        return CameraRepository.count();// o . expande oque esta dentro
    }
     public Camera salvar(Camera  Camera){
        return CameraRepository.save(Camera);
     }

     //public void delete(Integer id){
        //CameraRepository.deleteBy(id);
     //}
     public boolean delete(Integer id){
      Camera Camera = CameraRepository.findById(id).get();
      if(Camera!= null){
         CameraRepository.deleteById(id);
         return true;
      }
      return false;
   }

      public boolean update(Camera Camera) {
      CameraRepository.save(Camera);
      return true;
   }
      public Camera atualizar(Camera Camera, Integer id) {
      Camera e = buscar(id);
      if (e != null) {
         Camera.setCameraId(id);
         return CameraRepository.save(Camera);
      }
      return null;
   }
      public Camera buscar(Integer id){
      return CameraRepository.findById(id).get();
   }

   public List<Camera> Listar(){
      return CameraRepository.findAll();
   }
}
