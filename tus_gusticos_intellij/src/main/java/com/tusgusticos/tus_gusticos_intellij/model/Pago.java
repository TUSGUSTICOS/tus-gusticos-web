package com.tusgusticos.tus_gusticos_intellij.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad Pago - Mapea la tabla pagos en la base de datos
 */
@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago")
    private Long idPago;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pago", nullable = false)
    private MetodoPago metodoPago;

    @Column(name = "monto", nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(name = "fecha_pago", updatable = false)
    private LocalDateTime fechaPago;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pago")
    private EstadoPago estadoPago;

    // Enum para métodos de pago
    public enum MetodoPago {
        Credito, Debito, Nequi
    }

    // Enum para estados de pago
    public enum EstadoPago {
        Confirmado, Rechazado, Pendiente
    }

    // Constructor vacío
    public Pago() {
    }

    // Constructor con parámetros
    public Pago(Pedido pedido, MetodoPago metodoPago, BigDecimal monto) {
        this.pedido = pedido;
        this.metodoPago = metodoPago;
        this.monto = monto;
        this.estadoPago = EstadoPago.Pendiente;
    }

    // Método que se ejecuta antes de insertar en la base de datos
    @PrePersist
    protected void onCreate() {
        fechaPago = LocalDateTime.now();
        if (estadoPago == null) {
            estadoPago = EstadoPago.Pendiente;
        }
    }

    // Getters y Setters
    public Long getIdPago() {
        return idPago;
    }

    public void setIdPago(Long idPago) {
        this.idPago = idPago;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public MetodoPago getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(MetodoPago metodoPago) {
        this.metodoPago = metodoPago;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public LocalDateTime getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(LocalDateTime fechaPago) {
        this.fechaPago = fechaPago;
    }

    public EstadoPago getEstadoPago() {
        return estadoPago;
    }

    public void setEstadoPago(EstadoPago estadoPago) {
        this.estadoPago = estadoPago;
    }

    @Override
    public String toString() {
        return "Pago{" +
                "idPago=" + idPago +
                ", pedido=" + pedido +
                ", metodoPago=" + metodoPago +
                ", monto=" + monto +
                ", fechaPago=" + fechaPago +
                ", estadoPago=" + estadoPago +
                '}';
    }
}