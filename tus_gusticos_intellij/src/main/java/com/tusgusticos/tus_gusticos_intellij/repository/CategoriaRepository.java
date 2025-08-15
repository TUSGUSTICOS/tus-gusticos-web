package com.tusgusticos.tus_gusticos_intellij.repository;

import com.tusgusticos.tus_gusticos_intellij.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    Optional<Categoria> findByNombre(Categoria.TipoCategoria nombre);
}