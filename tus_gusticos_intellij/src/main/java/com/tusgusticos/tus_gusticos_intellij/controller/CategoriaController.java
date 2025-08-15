package com.tusgusticos.tus_gusticos_intellij.controller;

import com.tusgusticos.tus_gusticos_intellij.model.Categoria;
import com.tusgusticos.tus_gusticos_intellij.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // GET /api/categorias - listar todas
    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> getAll() {
        List<Categoria> lista = categoriaService.getAllCategorias();
        return ResponseEntity.ok(lista);
    }

    // GET /api/categorias/{id} - una por id
    @GetMapping("/categorias/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        Categoria cat = categoriaService.getCategoriaById(id);
        if (cat == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg("Categoría no encontrada"));
        }
        return ResponseEntity.ok(cat);
    }

    // POST /api/categorias - crear
    @PostMapping("/categorias")
    public ResponseEntity<?> create(@RequestBody Categoria categoria) {
        try {
            Categoria creada = categoriaService.createCategoria(categoria);
            return ResponseEntity.status(HttpStatus.CREATED).body(creada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(msg("Error al crear categoría: " + e.getMessage()));
        }
    }

    // PUT /api/categorias/{id} - actualizar
    @PutMapping("/categorias/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Categoria categoria) {
        try {
            Categoria actualizada = categoriaService.updateCategoria(id, categoria);
            if (actualizada == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg("Categoría no encontrada"));
            }
            return ResponseEntity.ok(actualizada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(msg("Error al actualizar categoría: " + e.getMessage()));
        }
    }

    // DELETE /api/categorias/{id} - eliminar
    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            boolean ok = categoriaService.deleteCategoria(id);
            if (!ok) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg("Categoría no encontrada"));
            }
            return ResponseEntity.ok(msg("Categoría eliminada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(msg("Error al eliminar categoría: " + e.getMessage()));
        }
    }

    // helper simple para mensajes { "message": "..." }
    private Map<String, String> msg(String text) {
        Map<String, String> m = new HashMap<>();
        m.put("message", text);
        return m;
    }
}
