package com.tusgusticos.tus_gusticos_intellij.repository;

import com.tusgusticos.tus_gusticos_intellij.model.Plato;
import com.tusgusticos.tus_gusticos_intellij.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatoRepository extends JpaRepository<Plato, Integer> {
    List<Plato> findByCategoria(Categoria categoria);
    List<Plato> findByCategoriaOrderByNombreAsc(Categoria categoria);
}