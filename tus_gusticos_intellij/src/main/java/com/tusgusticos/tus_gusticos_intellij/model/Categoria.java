package com.tusgusticos.tus_gusticos_intellij.model;

import jakarta.persistence.*;

/**
 * Entidad Categoria - Mapea la tabla categorias en la base de datos
 */
@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Integer idCategoria;

    @Enumerated(EnumType.STRING)
    @Column(name = "nombre", nullable = false)
    private TipoCategoria nombre;

    // Enum para los tipos de categoría
    public enum TipoCategoria {
        corriente, ejecutivo, carta
    }

    // Constructor vacío
    public Categoria() {
    }

    // Constructor con parámetros
    public Categoria(TipoCategoria nombre) {
        this.nombre = nombre;
    }

    // Getters y Setters
    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public TipoCategoria getNombre() {
        return nombre;
    }

    public void setNombre(TipoCategoria nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Categoria{" +
                "idCategoria=" + idCategoria +
                ", nombre=" + nombre +
                '}';
    }
}