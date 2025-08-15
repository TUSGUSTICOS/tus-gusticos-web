package com.tusgusticos.tus_gusticos_intellij.dto;

import java.math.BigDecimal;

/**
 * DTO para recibir los datos de un nuevo pago
 */
public class PagoRequest {
    private Long id_pedido;
    private String metodo_pago;
    private BigDecimal monto;

    // Constructor vacío
    public PagoRequest() {
    }

    // Constructor con parámetros
    public PagoRequest(Long id_pedido, String metodo_pago, BigDecimal monto) {
        this.id_pedido = id_pedido;
        this.metodo_pago = metodo_pago;
        this.monto = monto;
    }

    // Getters y Setters
    public Long getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(Long id_pedido) {
        this.id_pedido = id_pedido;
    }

    public String getMetodo_pago() {
        return metodo_pago;
    }

    public void setMetodo_pago(String metodo_pago) {
        this.metodo_pago = metodo_pago;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }
}