package com.tusgusticos.tus_gusticos_intellij.service;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.dto.PedidoRequest;
import com.tusgusticos.tus_gusticos_intellij.model.*;
import com.tusgusticos.tus_gusticos_intellij.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Servicio para manejar la lógica de negocio de pedidos
 */
@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PlatoRepository platoRepository;

    @Autowired
    private PagoRepository pagoRepository;

    /** ===== Helpers de mapeo a respuesta plana (sin recursión JSON) ===== */

    private Map<String, Object> toSimpleUsuario(Usuario u) {
        if (u == null) return null;
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("idUsuario", u.getIdUsuario());
        m.put("nombres", u.getNombres());
        m.put("apellidos", u.getApellidos());
        m.put("correoElectronico", u.getCorreoElectronico());
        m.put("telefono", u.getTelefono());
        m.put("rol", u.getRol());
        return m;
    }

    private Map<String, Object> toSimpleDetalle(DetallePedido d) {
        if (d == null) return null;
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("idDetalle", d.getIdDetalle());
        if (d.getPlato() != null) {
            m.put("idPlato", d.getPlato().getIdPlato());
            m.put("nombrePlato", d.getPlato().getNombre());
        } else {
            m.put("idPlato", null);
            m.put("nombrePlato", null);
        }
        m.put("cantidad", d.getCantidad());
        m.put("precioUnitario", d.getPrecioUnitario());
        return m;
    }

    private Map<String, Object> toSimplePedido(Pedido p) {
        if (p == null) return null;
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("idPedido", p.getIdPedido());
        m.put("usuario", toSimpleUsuario(p.getUsuario()));
        m.put("fechaPedido", p.getFechaPedido());
        m.put("estado", p.getEstado() != null ? p.getEstado().toString() : null);

        List<Map<String, Object>> detalles = (p.getDetalles() == null ? List.<DetallePedido>of() : p.getDetalles())
                .stream().map(this::toSimpleDetalle).collect(Collectors.toList());
        m.put("detalles", detalles);
        return m;
    }

    private List<Map<String, Object>> toSimplePedidos(List<Pedido> pedidos) {
        return pedidos.stream().map(this::toSimplePedido).collect(Collectors.toList());
    }

    /** ===== Operaciones ===== */

    /**
     * Crea un nuevo pedido con sus detalles
     */
    @Transactional
    public ApiResponse crearPedido(PedidoRequest pedidoRequest) {
        try {
            // Verificar usuario
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(pedidoRequest.getId_usuario());
            if (optionalUsuario.isEmpty()) {
                return ApiResponse.error("Usuario no encontrado");
            }
            Usuario usuario = optionalUsuario.get();

            // Crear pedido
            Pedido pedido = new Pedido(usuario);
            pedido = pedidoRepository.save(pedido);

            // Crear detalles
            List<DetallePedido> detalles = new ArrayList<>();
            for (PedidoRequest.ItemPedido item : pedidoRequest.getItems()) {
                Optional<Plato> optionalPlato = platoRepository.findById(item.getId_plato());
                if (optionalPlato.isEmpty()) {
                    return ApiResponse.error("Plato con ID " + item.getId_plato() + " no encontrado");
                }
                Plato plato = optionalPlato.get();

                DetallePedido detalle = new DetallePedido(
                        pedido,
                        plato,
                        item.getCantidad(),
                        item.getPrecio_unitario()
                );
                detalles.add(detalle);
            }

            // Guardar detalles y asociar
            detallePedidoRepository.saveAll(detalles);
            pedido.setDetalles(detalles);

            // ⬅️ Responder plano (evita recursión)
            return ApiResponse.success("Pedido creado exitosamente", toSimplePedido(pedido));

        } catch (Exception e) {
            return ApiResponse.error("Error al crear pedido: " + e.getMessage());
        }
    }

    /** Listar (entidad) */
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    /** Listar (plano) */
    public List<Map<String, Object>> getAllPedidosSimple() {
        return toSimplePedidos(getAllPedidos());
    }

    /** Obtener por ID (entidad) */
    public Pedido getPedidoById(Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.orElse(null);
    }

    /** Obtener por ID (plano) */
    public Map<String, Object> getPedidoSimpleById(Long id) {
        return toSimplePedido(getPedidoById(id));
    }

    /** Por usuario (entidad) */
    public List<Pedido> getPedidosPorUsuario(Integer idUsuario) {
        return pedidoRepository.findByUsuario_IdUsuarioOrderByFechaPedidoDesc(idUsuario);
    }

    /** Por usuario (plano) */
    public List<Map<String, Object>> getPedidosPorUsuarioSimple(Integer idUsuario) {
        return toSimplePedidos(getPedidosPorUsuario(idUsuario));
    }

    /** Actualiza estado (responde plano) */
    public ApiResponse actualizarEstadoPedido(Long idPedido, String nuevoEstado) {
        try {
            Optional<Pedido> optionalPedido = pedidoRepository.findById(idPedido);
            if (optionalPedido.isEmpty()) {
                return ApiResponse.error("Pedido no encontrado");
            }
            Pedido pedido = optionalPedido.get();

            try {
                // Valores válidos: Pendiente, Cancelado, Enviado
                Pedido.EstadoPedido estado = Pedido.EstadoPedido.valueOf(nuevoEstado);
                pedido.setEstado(estado);
                pedidoRepository.save(pedido);
                return ApiResponse.success("Estado del pedido actualizado exitosamente", toSimplePedido(pedido));
            } catch (IllegalArgumentException e) {
                return ApiResponse.error("Estado de pedido inválido: " + nuevoEstado
                        + ". Usa: Pendiente, Cancelado o Enviado.");
            }

        } catch (Exception e) {
            return ApiResponse.error("Error al actualizar estado del pedido: " + e.getMessage());
        }
    }

    /**
     * Elimina un pedido (solo si no tiene pago confirmado)
     */
    @Transactional
    public ApiResponse eliminarPedido(Long idPedido) {
        try {
            Optional<Pedido> optionalPedido = pedidoRepository.findById(idPedido);
            if (optionalPedido.isEmpty()) {
                return ApiResponse.error("Pedido no encontrado");
            }
            Pedido pedido = optionalPedido.get();

            // Si existe un pago confirmado, no permitir borrar
            Optional<Pago> pagoConfirmado = pagoRepository.findByPedido_IdPedido(idPedido);
            if (pagoConfirmado.isPresent() &&
                pagoConfirmado.get().getEstadoPago() == Pago.EstadoPago.Confirmado) {
                return ApiResponse.error("No se puede eliminar el pedido: tiene un pago confirmado");
            }

            // Borrar pagos NO confirmados asociados (si los hay)
            List<Pago> pagos = pagoRepository.findByPedido(pedido);
            if (!pagos.isEmpty()) {
                pagoRepository.deleteAll(pagos);
            }

            // Borrar detalles primero
            List<DetallePedido> detalles = detallePedidoRepository.findByPedido(pedido);
            if (!detalles.isEmpty()) {
                detallePedidoRepository.deleteAll(detalles);
            }

            // Borrar el pedido
            pedidoRepository.delete(pedido);

            return ApiResponse.success("Pedido eliminado correctamente", null);
        } catch (Exception e) {
            return ApiResponse.error("Error al eliminar pedido: " + e.getMessage());
        }
    }
}
