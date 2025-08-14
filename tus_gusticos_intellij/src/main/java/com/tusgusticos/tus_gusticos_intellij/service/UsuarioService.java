package com.tusgusticos.tus_gusticos_intellij.service;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.dto.LoginRequest;
import com.tusgusticos.tus_gusticos_intellij.model.Usuario;
import com.tusgusticos.tus_gusticos_intellij.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para manejar la lógica de negocio de usuarios
 */
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Obtiene todos los usuarios
     */
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    /**
     * Obtiene un usuario por ID
     */
    public Optional<Usuario> getUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    /**
     * Registra un nuevo usuario
     */
    public ApiResponse registrarUsuario(Usuario usuario) {
        try {
            // Verificar si el correo ya existe
            if (usuarioRepository.existsByCorreoElectronico(usuario.getCorreoElectronico())) {
                return ApiResponse.error("El correo electrónico ya está registrado");
            }

            // Verificar si el teléfono ya existe
            if (usuario.getTelefono() != null &&
                    usuarioRepository.existsByTelefono(usuario.getTelefono())) {
                return ApiResponse.error("El número de teléfono ya está registrado");
            }

            // Guardar el usuario
            Usuario usuarioGuardado = usuarioRepository.save(usuario);

            // Limpiar la contraseña antes de devolver
            usuarioGuardado.setContrasena(null);

            return ApiResponse.success("Usuario registrado exitosamente", usuarioGuardado);

        } catch (Exception e) {
            return ApiResponse.error("Error al registrar usuario: " + e.getMessage());
        }
    }

    /**
     * Realiza el login de un usuario
     */
    public ApiResponse loginUsuario(LoginRequest loginRequest) {
        try {
            Usuario usuario = null;

            // Buscar por correo electrónico
            if (loginRequest.getCorreoElectronico() != null &&
                    !loginRequest.getCorreoElectronico().isEmpty()) {
                Optional<Usuario> usuarioOpt = usuarioRepository
                        .findByCorreoElectronico(loginRequest.getCorreoElectronico());

                if (usuarioOpt.isEmpty()) {
                    return ApiResponse.error("Usuario no registrado");
                }
                usuario = usuarioOpt.get();
            }
            // Buscar por teléfono
            else if (loginRequest.getTelefono() != null &&
                    !loginRequest.getTelefono().isEmpty()) {
                Optional<Usuario> usuarioOpt = usuarioRepository
                        .findByTelefono(loginRequest.getTelefono());

                if (usuarioOpt.isEmpty()) {
                    return ApiResponse.error("Usuario no registrado");
                }
                usuario = usuarioOpt.get();
            } else {
                return ApiResponse.error("Debe proporcionar correo o teléfono");
            }

            // Verificar contraseña
            if (!usuario.getContrasena().equals(loginRequest.getContrasena())) {
                return ApiResponse.error("Contraseña incorrecta");
            }

            // Login exitoso - Limpiar contraseña antes de devolver
            usuario.setContrasena(null);
            return ApiResponse.success("Autenticación satisfactoria", usuario);

        } catch (Exception e) {
            return ApiResponse.error("Error en la autenticación: " + e.getMessage());
        }
    }

    /**
     * Actualiza un usuario existente
     */
    public ApiResponse actualizarUsuario(Integer id, Usuario usuarioDetails) {
        try {
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

            if (optionalUsuario.isEmpty()) {
                return ApiResponse.error("Usuario no encontrado");
            }

            Usuario usuario = optionalUsuario.get();

            // Actualizar campos
            usuario.setNombres(usuarioDetails.getNombres());
            usuario.setApellidos(usuarioDetails.getApellidos());
            usuario.setGenero(usuarioDetails.getGenero());
            usuario.setFechaNacimiento(usuarioDetails.getFechaNacimiento());

            // Verificar si el nuevo correo ya existe (si es diferente)
            if (!usuario.getCorreoElectronico().equals(usuarioDetails.getCorreoElectronico())) {
                if (usuarioRepository.existsByCorreoElectronico(usuarioDetails.getCorreoElectronico())) {
                    return ApiResponse.error("El correo electrónico ya está en uso");
                }
                usuario.setCorreoElectronico(usuarioDetails.getCorreoElectronico());
            }

            // Verificar si el nuevo teléfono ya existe (si es diferente)
            if (usuarioDetails.getTelefono() != null &&
                    !usuarioDetails.getTelefono().equals(usuario.getTelefono())) {
                if (usuarioRepository.existsByTelefono(usuarioDetails.getTelefono())) {
                    return ApiResponse.error("El teléfono ya está en uso");
                }
                usuario.setTelefono(usuarioDetails.getTelefono());
            }

            // Actualizar contraseña solo si se proporciona una nueva
            if (usuarioDetails.getContrasena() != null &&
                    !usuarioDetails.getContrasena().isEmpty()) {
                usuario.setContrasena(usuarioDetails.getContrasena());
            }

            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            usuarioActualizado.setContrasena(null);

            return ApiResponse.success("Usuario actualizado exitosamente", usuarioActualizado);

        } catch (Exception e) {
            return ApiResponse.error("Error al actualizar usuario: " + e.getMessage());
        }
    }

    /**
     * Elimina un usuario
     */
    public ApiResponse eliminarUsuario(Integer id) {
        try {
            if (!usuarioRepository.existsById(id)) {
                return ApiResponse.error("Usuario no encontrado");
            }

            usuarioRepository.deleteById(id);
            return ApiResponse.success("Usuario eliminado exitosamente");

        } catch (Exception e) {
            return ApiResponse.error("Error al eliminar usuario: " + e.getMessage());
        }
    }
}








