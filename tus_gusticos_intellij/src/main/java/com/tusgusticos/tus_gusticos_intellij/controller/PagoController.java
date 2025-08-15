package com.tusgusticos.tus_gusticos_intellij.controller;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.dto.PagoRequest;
import com.tusgusticos.tus_gusticos_intellij.model.Pago;
import com.tusgusticos.tus_gusticos_intellij.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para manejar las peticiones relacionadas con pagos
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PagoController {

    @Autowired
    private PagoService pagoService;

    /** POST /api/pagos - procesar pago */
    @PostMapping("/pagos")
    public ResponseEntity<ApiResponse> procesarPago(@RequestBody PagoRequest pagoRequest) {
        ApiResponse response = pagoService.procesarPago(pagoRequest);
        if (response.isSuccess()) return ResponseEntity.ok(response);
        return ResponseEntity.badRequest().body(response);
    }

    /** GET /api/pagos/pedido/{idPedido} - pagos por pedido (plano) */
    @GetMapping("/pagos/pedido/{idPedido}")
    public ResponseEntity<ApiResponse> getPagosPorPedido(@PathVariable Long idPedido) {
        return ResponseEntity.ok(
                ApiResponse.success("Pagos obtenidos exitosamente",
                        pagoService.getPagosPorPedidoSimple(idPedido))
        );
    }

    /** GET /api/pagos - listar todos (plano) */
    @GetMapping("/pagos")
    public ResponseEntity<ApiResponse> getAllPagos() {
        return ResponseEntity.ok(
                ApiResponse.success("Pagos obtenidos exitosamente",
                        pagoService.getAllPagosSimple())
        );
    }

    /** GET /api/pagos/{id} - uno por id (plano) */
    @GetMapping("/pagos/{id}")
    public ResponseEntity<ApiResponse> getPagoById(@PathVariable Long id) {
        var simple = pagoService.getPagoSimpleById(id);
        if (simple != null) {
            return ResponseEntity.ok(ApiResponse.success("Pago encontrado", simple));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /** PUT /api/pagos/{id}/estado?estado=Confirmado|Rechazado|Pendiente */
    @PutMapping("/pagos/{id}/estado")
    public ResponseEntity<ApiResponse> actualizarEstadoPago(
            @PathVariable Long id,
            @RequestParam String estado) {
        ApiResponse response = pagoService.actualizarEstadoPago(id, estado);
        if (response.isSuccess()) return ResponseEntity.ok(response);
        return ResponseEntity.badRequest().body(response);
    }

    /** DELETE /api/pagos/{id} */
    @DeleteMapping("/pagos/{id}")
    public ResponseEntity<ApiResponse> deletePago(@PathVariable Long id) {
        boolean eliminado = pagoService.deletePago(id);
        if (!eliminado) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ApiResponse.success("Pago eliminado correctamente", null));
    }
}

