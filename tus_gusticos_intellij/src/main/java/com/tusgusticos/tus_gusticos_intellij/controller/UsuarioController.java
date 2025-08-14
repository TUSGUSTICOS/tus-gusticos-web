package com.tusgusticos.tus_gusticos_intellij.controller;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.dto.LoginRequest;
import com.tusgusticos.tus_gusticos_intellij.model.Usuario;
import com.tusgusticos.tus_gusticos_intellij.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para manejar las peticiones relacionadas con usuarios
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Endpoint para el login
     * POST /api/login
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        ApiResponse response = usuarioService.loginUsuario(loginRequest);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            // Determinar el tipo de error
            if (response.getMessage().contains("Usuario no registrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else if (response.getMessage().contains("Contraseña incorrecta")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }
    }

    /**
     * Endpoint para el registro
     * POST /api/registro
     */
    @PostMapping("/registro")
    public ResponseEntity<ApiResponse> registro(@RequestBody Usuario usuario) {
        ApiResponse response = usuarioService.registrarUsuario(usuario);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            // Si es error de duplicado
            if (response.getMessage().contains("ya está registrado")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * Obtener todos los usuarios
     * GET /api/usuarios
     */
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        // Limpiar contraseñas antes de enviar
        usuarios.forEach(u -> u.setContrasena(null));
        return ResponseEntity.ok(usuarios);
    }

    /**
     * Obtener un usuario por ID
     * GET /api/usuarios/{id}
     */
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);

        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            u.setContrasena(null); // No enviar la contraseña
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Usuario no encontrado"));
        }
    }

    /**
     * Crear un nuevo usuario (alternativa a registro)
     * POST /api/usuarios
     */
    @PostMapping("/usuarios")
    public ResponseEntity<ApiResponse> createUsuario(@RequestBody Usuario usuario) {
        return registro(usuario); // Reutiliza la lógica de registro
    }

    /**
     * Actualizar un usuario
     * PUT /api/usuarios/{id}
     */
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<ApiResponse> updateUsuario(
            @PathVariable Integer id,
            @RequestBody Usuario usuario) {

        ApiResponse response = usuarioService.actualizarUsuario(id, usuario);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            if (response.getMessage().contains("no encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else if (response.getMessage().contains("ya está en uso")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * Eliminar un usuario
     * DELETE /api/usuarios/{id}
     * Este endpoint debe ser protegido en producción
     */
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<ApiResponse> deleteUsuario(@PathVariable Integer id) {
        ApiResponse response = usuarioService.eliminarUsuario(id);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            if (response.getMessage().contains("no encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * Endpoint de prueba
     * GET /api/test
     */
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API funcionando correctamente");
    }
}






