package br.com.senai.infob.biblioteca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.senai.infob.biblioteca.models.Deteccao;

@Repository
public interface DeteccaoRepository extends JpaRepository<Deteccao, Integer>{
    
}
