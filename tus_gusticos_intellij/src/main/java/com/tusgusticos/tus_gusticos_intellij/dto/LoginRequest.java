package com.tusgusticos.tus_gusticos_intellij.dto;

/**
 * DTO para recibir las credenciales de login
 */
public class LoginRequest {
    private String correoElectronico;
    private String telefono;
    private String contrasena;

    // Constructores
    public LoginRequest() {
    }

    public LoginRequest(String correoElectronico, String telefono, String contrasena) {
        this.correoElectronico = correoElectronico;
        this.telefono = telefono;
        this.contrasena = contrasena;
    }

    // Getters y Setters
    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}