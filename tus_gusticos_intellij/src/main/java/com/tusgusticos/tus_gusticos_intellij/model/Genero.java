package com.tusgusticos.tus_gusticos_intellij.model;

/**
 * Enum para representar los géneros disponibles en el sistema
 */
public enum Genero {
    MASCULINO("masculino"),
    FEMENINO("femenino"),
    OTRO("otro");

    private String valor;

    Genero(String valor) {
        this.valor = valor;
    }

    public String getValor() {
        return valor;
    }
}