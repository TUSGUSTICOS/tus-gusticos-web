package com.tusgusticos.tus_gusticos_intellij.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Entidad DetallePedido - Mapea la tabla detalle_pedido en la base de datos
 */
@Entity
@Table(name = "detalle_pedido")
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Long idDetalle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_plato", nullable = false)
    private Plato plato;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    // Constructor vacío
    public DetallePedido() {
    }

    // Constructor con parámetros
    public DetallePedido(Pedido pedido, Plato plato, Integer cantidad, BigDecimal precioUnitario) {
        this.pedido = pedido;
        this.plato = plato;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    // Método para calcular el subtotal
    public BigDecimal getSubtotal() {
        return precioUnitario.multiply(BigDecimal.valueOf(cantidad));
    }

    // Getters y Setters
    public Long getIdDetalle() {
        return idDetalle;
    }

    public void setIdDetalle(Long idDetalle) {
        this.idDetalle = idDetalle;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    @Override
    public String toString() {
        return "DetallePedido{" +
                "idDetalle=" + idDetalle +
                ", pedido=" + pedido +
                ", plato=" + plato +
                ", cantidad=" + cantidad +
                ", precioUnitario=" + precioUnitario +
                '}';
    }
}