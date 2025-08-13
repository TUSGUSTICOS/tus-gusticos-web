package com.tusgusticos.tusgusticos.controller;

import com.tusgusticos.tusgusticos.model.Usuario;
import com.tusgusticos.tusgusticos.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.listarUsuarios();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public Usuario obtenerPorId(@PathVariable Integer id) {
        return usuarioService.buscarPorId(id);
    }

    // Crear nuevo usuario
    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        return usuarioService.guardarUsuario(usuario);
    }

    // Actualizar un usuario
    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Integer id, @RequestBody Usuario usuario) {
        return usuarioService.actualizarUsuario(id, usuario);
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        usuarioService.eliminarUsuario(id);
    }
}



