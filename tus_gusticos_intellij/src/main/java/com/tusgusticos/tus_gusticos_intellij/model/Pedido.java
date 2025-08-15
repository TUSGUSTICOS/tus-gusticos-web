package com.tusgusticos.tus_gusticos_intellij.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Entidad Pedido - Mapea la tabla pedidos en la base de datos
 */
@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long idPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_pedido", updatable = false)
    private LocalDateTime fechaPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoPedido estado;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetallePedido> detalles;

    // Enum para los estados del pedido
    public enum EstadoPedido {
        Pendiente, Cancelado, Enviado
    }

    // Constructor vacío
    public Pedido() {
    }

    // Constructor con parámetros
    public Pedido(Usuario usuario) {
        this.usuario = usuario;
        this.estado = EstadoPedido.Pendiente;
    }

    // Método que se ejecuta antes de insertar en la base de datos
    @PrePersist
    protected void onCreate() {
        fechaPedido = LocalDateTime.now();
        if (estado == null) {
            estado = EstadoPedido.Pendiente;
        }
    }

    // Getters y Setters
    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDateTime fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public EstadoPedido getEstado() {
        return estado;
    }

    public void setEstado(EstadoPedido estado) {
        this.estado = estado;
    }

    public List<DetallePedido> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetallePedido> detalles) {
        this.detalles = detalles;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "idPedido=" + idPedido +
                ", usuario=" + usuario +
                ", fechaPedido=" + fechaPedido +
                ", estado=" + estado +
                '}';
    }
}