package com.tusgusticos.tus_gusticos_intellij.service;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.dto.PagoRequest;
import com.tusgusticos.tus_gusticos_intellij.model.Pago;
import com.tusgusticos.tus_gusticos_intellij.model.Pedido;
import com.tusgusticos.tus_gusticos_intellij.repository.PagoRepository;
import com.tusgusticos.tus_gusticos_intellij.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Servicio para manejar la lógica de negocio de pagos
 */
@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    /** Util: convertir Pago a mapa plano (evita recursión JSON) */
    private Map<String, Object> toSimple(Pago pago) {
        if (pago == null) return null;
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("idPago", pago.getIdPago());
        m.put("idPedido", pago.getPedido() != null ? pago.getPedido().getIdPedido() : null);
        m.put("metodoPago", pago.getMetodoPago() != null ? pago.getMetodoPago().toString() : null);
        m.put("monto", pago.getMonto());
        m.put("estadoPago", pago.getEstadoPago() != null ? pago.getEstadoPago().toString() : null);
        m.put("fechaPago", pago.getFechaPago());
        return m;
    }

    /**
     * Procesa un nuevo pago
     */
    @Transactional
    public ApiResponse procesarPago(PagoRequest pagoRequest) {
        try {
            if (pagoRequest.getId_pedido() == null) {
                return ApiResponse.error("ID de pedido no puede ser null");
            }

            Optional<Pedido> optionalPedido = pedidoRepository.findById(pagoRequest.getId_pedido());
            if (optionalPedido.isEmpty()) {
                return ApiResponse.error("Pedido no encontrado con ID: " + pagoRequest.getId_pedido());
            }
            Pedido pedido = optionalPedido.get();

            // Verificar pago existente confirmado
            Optional<Pago> pagoExistente = pagoRepository.findByPedido_IdPedido(pagoRequest.getId_pedido());
            if (pagoExistente.isPresent() &&
                pagoExistente.get().getEstadoPago() == Pago.EstadoPago.Confirmado) {
                return ApiResponse.error("Este pedido ya tiene un pago confirmado");
            }

            // Validar método de pago
            if (pagoRequest.getMetodo_pago() == null || pagoRequest.getMetodo_pago().trim().isEmpty()) {
                return ApiResponse.error("Metodo de pago requerido");
            }
            Pago.MetodoPago metodoPago;
            try {
                metodoPago = Pago.MetodoPago.valueOf(pagoRequest.getMetodo_pago().trim());
            } catch (IllegalArgumentException e) {
                return ApiResponse.error("Metodo de pago invalido: '" + pagoRequest.getMetodo_pago()
                        + "'. Valores validos: " + Arrays.toString(Pago.MetodoPago.values()));
            }

            // Validar monto
            if (pagoRequest.getMonto() == null || pagoRequest.getMonto().compareTo(java.math.BigDecimal.ZERO) <= 0) {
                return ApiResponse.error("Monto debe ser mayor a cero");
            }

            // Crear y confirmar (simulado) el pago
            Pago pago = new Pago(pedido, metodoPago, pagoRequest.getMonto());
            pago.setEstadoPago(Pago.EstadoPago.Confirmado);
            pago = pagoRepository.save(pago);

            return ApiResponse.success("Pago procesado exitosamente", toSimple(pago));

        } catch (Exception e) {
            return ApiResponse.error("Error al procesar pago: " + e.getMessage());
        }
    }

    /** Obtiene todos los pagos (entidades) */
    public List<Pago> getAllPagos() {
        return pagoRepository.findAll();
    }

    /** Obtiene todos los pagos (planos) */
    public List<Map<String, Object>> getAllPagosSimple() {
        return getAllPagos().stream().map(this::toSimple).collect(Collectors.toList());
    }

    /** Obtiene un pago por ID (entidad) */
    public Pago getPagoById(Long id) {
        Optional<Pago> pago = pagoRepository.findById(id);
        return pago.orElse(null);
    }

    /** Obtiene un pago por ID (plano) */
    public Map<String, Object> getPagoSimpleById(Long id) {
        return toSimple(getPagoById(id));
    }

    /** Obtiene pagos por pedido (entidades) */
    public List<Pago> getPagosPorPedido(Long idPedido) {
        Optional<Pedido> optionalPedido = pedidoRepository.findById(idPedido);
        if (optionalPedido.isPresent()) {
            return pagoRepository.findByPedido(optionalPedido.get());
        }
        return List.of();
    }

    /** Obtiene pagos por pedido (planos) */
    public List<Map<String, Object>> getPagosPorPedidoSimple(Long idPedido) {
        return getPagosPorPedido(idPedido).stream().map(this::toSimple).collect(Collectors.toList());
    }

    /** Actualiza el estado de un pago, responde plano */
    public ApiResponse actualizarEstadoPago(Long idPago, String nuevoEstado) {
        try {
            Optional<Pago> optionalPago = pagoRepository.findById(idPago);
            if (optionalPago.isEmpty()) {
                return ApiResponse.error("Pago no encontrado");
            }

            Pago pago = optionalPago.get();
            try {
                Pago.EstadoPago estado = Pago.EstadoPago.valueOf(nuevoEstado);
                pago.setEstadoPago(estado);
                pagoRepository.save(pago);
                return ApiResponse.success("Estado del pago actualizado exitosamente", toSimple(pago));
            } catch (IllegalArgumentException e) {
                return ApiResponse.error("Estado de pago invalido: " + nuevoEstado
                        + ". Valores validos: " + Arrays.toString(Pago.EstadoPago.values()));
            }

        } catch (Exception e) {
            return ApiResponse.error("Error al actualizar estado del pago: " + e.getMessage());
        }
    }

    /** Elimina un pago por ID */
    @Transactional
    public boolean deletePago(Long idPago) {
        if (!pagoRepository.existsById(idPago)) {
            return false;
        }
        pagoRepository.deleteById(idPago);
        return true;
    }
}


