package com.tusgusticos.tus_gusticos_intellij.controller;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.model.Plato;
import com.tusgusticos.tus_gusticos_intellij.service.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para manejar las peticiones relacionadas con platos
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PlatoController {

    @Autowired
    private PlatoService platoService;

    /**
     * Obtener todos los platos
     * GET /api/platos
     */
    @GetMapping("/platos")
    public ResponseEntity<ApiResponse> getAllPlatos() {
        List<Plato> platos = platoService.getAllPlatos();
        return ResponseEntity.ok(ApiResponse.success("Platos obtenidos exitosamente", platos));
    }

    /**
     * Obtener platos por categoría
     * GET /api/platos/categoria/{categoria}
     */
    @GetMapping("/platos/categoria/{categoria}")
    public ResponseEntity<ApiResponse> getPlatosPorCategoria(@PathVariable String categoria) {
        try {
            List<Plato> platos = platoService.getPlatosPorCategoria(categoria);
            return ResponseEntity.ok(ApiResponse.success("Platos obtenidos exitosamente", platos));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al obtener platos: " + e.getMessage()));
        }
    }

    /**
     * Obtener un plato por ID
     * GET /api/platos/{id}
     */
    @GetMapping("/platos/{id}")
    public ResponseEntity<ApiResponse> getPlatoById(@PathVariable Integer id) {
        try {
            Plato plato = platoService.getPlatoById(id);
            if (plato != null) {
                return ResponseEntity.ok(ApiResponse.success("Plato encontrado", plato));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al obtener plato: " + e.getMessage()));
        }
    }

    /**
     * Crear un nuevo plato
     * POST /api/platos
     */
    @PostMapping("/platos")
    public ResponseEntity<ApiResponse> createPlato(@RequestBody Plato plato) {
        try {
            Plato platoCreado = platoService.createPlato(plato);
            return ResponseEntity.ok(ApiResponse.success("Plato creado exitosamente", platoCreado));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al crear plato: " + e.getMessage()));
        }
    }

    /**
     * Actualizar un plato
     * PUT /api/platos/{id}
     */
    @PutMapping("/platos/{id}")
    public ResponseEntity<ApiResponse> updatePlato(@PathVariable Integer id, @RequestBody Plato plato) {
        try {
            Plato platoActualizado = platoService.updatePlato(id, plato);
            if (platoActualizado != null) {
                return ResponseEntity.ok(ApiResponse.success("Plato actualizado exitosamente", platoActualizado));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al actualizar plato: " + e.getMessage()));
        }
    }

    /**
     * Eliminar un plato
     * DELETE /api/platos/{id}
     */
    @DeleteMapping("/platos/{id}")
    public ResponseEntity<ApiResponse> deletePlato(@PathVariable Integer id) {
        try {
            boolean eliminado = platoService.deletePlato(id);
            if (eliminado) {
                return ResponseEntity.ok(ApiResponse.success("Plato eliminado exitosamente"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al eliminar plato: " + e.getMessage()));
        }
    }
}