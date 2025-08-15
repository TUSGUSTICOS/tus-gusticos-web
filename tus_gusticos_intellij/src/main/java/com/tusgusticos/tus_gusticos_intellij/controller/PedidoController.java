package com.tusgusticos.tus_gusticos_intellij.controller;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.dto.PedidoRequest;
import com.tusgusticos.tus_gusticos_intellij.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para manejar las peticiones relacionadas con pedidos
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    /** POST /api/pedidos - crear (responde plano) */
    @PostMapping("/pedidos")
    public ResponseEntity<ApiResponse> crearPedido(@RequestBody PedidoRequest pedidoRequest) {
        ApiResponse response = pedidoService.crearPedido(pedidoRequest);
        if (response.isSuccess()) return ResponseEntity.ok(response);
        return ResponseEntity.badRequest().body(response);
    }

    /** GET /api/pedidos/usuario/{idUsuario} - lista por usuario (plano) */
    @GetMapping("/pedidos/usuario/{idUsuario}")
    public ResponseEntity<ApiResponse> getPedidosPorUsuario(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(
                ApiResponse.success("Pedidos obtenidos exitosamente",
                        pedidoService.getPedidosPorUsuarioSimple(idUsuario))
        );
    }

    /** GET /api/pedidos - listar todos (plano) */
    @GetMapping("/pedidos")
    public ResponseEntity<ApiResponse> getAllPedidos() {
        return ResponseEntity.ok(
                ApiResponse.success("Pedidos obtenidos exitosamente",
                        pedidoService.getAllPedidosSimple())
        );
    }

    /** GET /api/pedidos/{id} - uno por id (plano) */
    @GetMapping("/pedidos/{id}")
    public ResponseEntity<ApiResponse> getPedidoById(@PathVariable Long id) {
        var simple = pedidoService.getPedidoSimpleById(id);
        if (simple != null) {
            return ResponseEntity.ok(ApiResponse.success("Pedido encontrado", simple));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /** PUT /api/pedidos/{id}/estado - actualizar estado (plano) */
    @PutMapping("/pedidos/{id}/estado")
    public ResponseEntity<ApiResponse> actualizarEstadoPedido(
            @PathVariable Long id,
            @RequestParam String estado) {
        ApiResponse response = pedidoService.actualizarEstadoPedido(id, estado);
        if (response.isSuccess()) return ResponseEntity.ok(response);
        return ResponseEntity.badRequest().body(response);
    }

    /** DELETE /api/pedidos/{id} - eliminar */
    @DeleteMapping("/pedidos/{id}")
    public ResponseEntity<ApiResponse> eliminarPedido(@PathVariable Long id) {
        ApiResponse response = pedidoService.eliminarPedido(id);
        if (response.isSuccess()) return ResponseEntity.ok(response);
        return ResponseEntity.badRequest().body(response);
    }
}

