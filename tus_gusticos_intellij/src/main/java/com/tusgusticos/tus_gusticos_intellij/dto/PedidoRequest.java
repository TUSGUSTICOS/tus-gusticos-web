package com.tusgusticos.tus_gusticos_intellij.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para recibir los datos de un nuevo pedido
 */
public class PedidoRequest {
    private Integer id_usuario;
    private List<ItemPedido> items;

    // Clase interna para los items del pedido
    public static class ItemPedido {
        private Integer id_plato;
        private Integer cantidad;
        private BigDecimal precio_unitario;

        // Constructor vacío
        public ItemPedido() {
        }

        // Constructor con parámetros
        public ItemPedido(Integer id_plato, Integer cantidad, BigDecimal precio_unitario) {
            this.id_plato = id_plato;
            this.cantidad = cantidad;
            this.precio_unitario = precio_unitario;
        }

        // Getters y Setters
        public Integer getId_plato() {
            return id_plato;
        }

        public void setId_plato(Integer id_plato) {
            this.id_plato = id_plato;
        }

        public Integer getCantidad() {
            return cantidad;
        }

        public void setCantidad(Integer cantidad) {
            this.cantidad = cantidad;
        }

        public BigDecimal getPrecio_unitario() {
            return precio_unitario;
        }

        public void setPrecio_unitario(BigDecimal precio_unitario) {
            this.precio_unitario = precio_unitario;
        }
    }

    // Constructor vacío
    public PedidoRequest() {
    }

    // Constructor con parámetros
    public PedidoRequest(Integer id_usuario, List<ItemPedido> items) {
        this.id_usuario = id_usuario;
        this.items = items;
    }

    // Getters y Setters
    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public List<ItemPedido> getItems() {
        return items;
    }

    public void setItems(List<ItemPedido> items) {
        this.items = items;
    }
}