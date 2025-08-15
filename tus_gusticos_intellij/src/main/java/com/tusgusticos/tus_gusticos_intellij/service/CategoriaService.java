package com.tusgusticos.tus_gusticos_intellij.service;

import com.tusgusticos.tus_gusticos_intellij.model.Categoria;
import com.tusgusticos.tus_gusticos_intellij.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    // Listar todas
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    // Obtener por id
    public Categoria getCategoriaById(Integer id) {
        Optional<Categoria> opt = categoriaRepository.findById(id);
        return opt.orElse(null);
    }

    // ✅ NUEVO: Obtener por nombre (ignora mayúsculas/minúsculas)
    // Funciona tanto si 'nombre' es String como si es Enum (usa toString()).
    public Categoria getCategoriaByNombre(String nombreCategoria) {
        if (nombreCategoria == null) return null;
        String target = nombreCategoria.trim();

        return categoriaRepository.findAll().stream()
                .filter(c -> c.getNombre() != null && c.getNombre().toString().equalsIgnoreCase(target))
                .findFirst()
                .orElse(null);
    }

    // Crear
    public Categoria createCategoria(Categoria categoria) {
        // Si tu entidad usa enum para nombre, el setter ya validará;
        // si es String, aquí podrías validar "corriente/ejecutivo/carta" si quieres.
        return categoriaRepository.save(categoria);
    }

    // Actualizar
    @Transactional
    public Categoria updateCategoria(Integer id, Categoria categoriaDetails) {
        Categoria existente = getCategoriaById(id);
        if (existente == null) return null;

        // Actualiza SOLO los campos permitidos
        if (categoriaDetails.getNombre() != null) {
            existente.setNombre(categoriaDetails.getNombre());
        }
        // Si tu entidad tiene más campos (descripción, estado, etc.), agrégalos aquí.

        return categoriaRepository.save(existente);
    }

    // Eliminar
    @Transactional
    public boolean deleteCategoria(Integer id) {
        if (!categoriaRepository.existsById(id)) return false;
        categoriaRepository.deleteById(id);
        return true;
    }
}

