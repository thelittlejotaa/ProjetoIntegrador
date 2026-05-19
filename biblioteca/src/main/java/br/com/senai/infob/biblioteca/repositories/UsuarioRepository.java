package br.com.senai.infob.biblioteca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.senai.infob.biblioteca.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    
}

