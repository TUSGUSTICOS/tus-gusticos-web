package com.tusgusticos.tus_gusticos_intellij.service;

import com.tusgusticos.tus_gusticos_intellij.model.Categoria;
import com.tusgusticos.tus_gusticos_intellij.model.Plato;
import com.tusgusticos.tus_gusticos_intellij.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para manejar la lógica de negocio de platos
 */
@Service
public class PlatoService {

    @Autowired
    private PlatoRepository platoRepository;

    @Autowired
    private CategoriaService categoriaService;

    /**
     * Obtiene todos los platos
     */
    public List<Plato> getAllPlatos() {
        return platoRepository.findAll();
    }

    /**
     * Obtiene un plato por ID
     */
    public Plato getPlatoById(Integer id) {
        Optional<Plato> plato = platoRepository.findById(id);
        return plato.orElse(null);
    }

    /**
     * Obtiene platos por categoría
     */
    public List<Plato> getPlatosPorCategoria(String nombreCategoria) {
        Categoria categoria = categoriaService.getCategoriaByNombre(nombreCategoria);
        if (categoria != null) {
            return platoRepository.findByCategoriaOrderByNombreAsc(categoria);
        }
        return List.of(); // Lista vacía si no se encuentra la categoría
    }

    /**
     * Crea un nuevo plato
     */
    public Plato createPlato(Plato plato) {
        return platoRepository.save(plato);
    }

    /**
     * Actualiza un plato existente
     */
    public Plato updatePlato(Integer id, Plato platoDetails) {
        Optional<Plato> optionalPlato = platoRepository.findById(id);
        
        if (optionalPlato.isPresent()) {
            Plato plato = optionalPlato.get();
            plato.setNombre(platoDetails.getNombre());
            plato.setDescripcion(platoDetails.getDescripcion());
            plato.setPrecio(platoDetails.getPrecio());
            plato.setImagenUrl(platoDetails.getImagenUrl());
            plato.setCategoria(platoDetails.getCategoria());
            
            return platoRepository.save(plato);
        }
        
        return null;
    }

    /**
     * Elimina un plato
     */
    public boolean deletePlato(Integer id) {
        if (platoRepository.existsById(id)) {
            platoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}