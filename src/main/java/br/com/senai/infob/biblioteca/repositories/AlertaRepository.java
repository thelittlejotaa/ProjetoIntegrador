package br.com.senai.infob.biblioteca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.senai.infob.biblioteca.models.Alerta;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Integer>{
    
}
