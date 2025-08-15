package com.tusgusticos.tus_gusticos_intellij.service;

import com.tusgusticos.tus_gusticos_intellij.dto.ApiResponse;
import com.tusgusticos.tus_gusticos_intellij.dto.LoginRequest;
import com.tusgusticos.tus_gusticos_intellij.model.Usuario;
import com.tusgusticos.tus_gusticos_intellij.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    public ApiResponse registrarUsuario(Usuario usuario) {
        try {
            if (usuarioRepository.existsByCorreoElectronico(usuario.getCorreoElectronico())) {
                return ApiResponse.error("El correo electronico ya esta registrado");
            }

            if (usuario.getTelefono() != null &&
                    usuarioRepository.existsByTelefono(usuario.getTelefono())) {
                return ApiResponse.error("El numero de telefono ya esta registrado");
            }

            Usuario usuarioGuardado = usuarioRepository.save(usuario);
            usuarioGuardado.setContrasena(null);

            return ApiResponse.success("Usuario registrado exitosamente", usuarioGuardado);

        } catch (Exception e) {
            return ApiResponse.error("Error al registrar usuario: " + e.getMessage());
        }
    }

    public ApiResponse loginUsuario(LoginRequest loginRequest) {
        try {
            Usuario usuario = null;

            if (loginRequest.getCorreoElectronico() != null &&
                    !loginRequest.getCorreoElectronico().isEmpty()) {
                Optional<Usuario> usuarioOpt = usuarioRepository
                        .findByCorreoElectronico(loginRequest.getCorreoElectronico());

                if (usuarioOpt.isEmpty()) {
                    return ApiResponse.error("Usuario no registrado");
                }
                usuario = usuarioOpt.get();
            }
            else if (loginRequest.getTelefono() != null &&
                    !loginRequest.getTelefono().isEmpty()) {
                Optional<Usuario> usuarioOpt = usuarioRepository
                        .findByTelefono(loginRequest.getTelefono());

                if (usuarioOpt.isEmpty()) {
                    return ApiResponse.error("Usuario no registrado");
                }
                usuario = usuarioOpt.get();
            } else {
                return ApiResponse.error("Debe proporcionar correo o telefono");
            }

            if (!usuario.getContrasena().equals(loginRequest.getContrasena())) {
                return ApiResponse.error("Contrasena incorrecta");
            }

            usuario.setContrasena(null);
            return ApiResponse.success("Autenticacion satisfactoria", usuario);

        } catch (Exception e) {
            return ApiResponse.error("Error en la autenticacion: " + e.getMessage());
        }
    }

    public ApiResponse actualizarUsuario(Integer id, Usuario usuarioDetails) {
        try {
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

            if (optionalUsuario.isEmpty()) {
                return ApiResponse.error("Usuario no encontrado");
            }

            Usuario usuario = optionalUsuario.get();

            if (usuarioDetails.getNombres() != null) {
                usuario.setNombres(usuarioDetails.getNombres());
            }
            
            if (usuarioDetails.getApellidos() != null) {
                usuario.setApellidos(usuarioDetails.getApellidos());
            }
            
            if (usuarioDetails.getGenero() != null) {
                usuario.setGenero(usuarioDetails.getGenero());
            }
            
            if (usuarioDetails.getFechaNacimiento() != null) {
                usuario.setFechaNacimiento(usuarioDetails.getFechaNacimiento());
            }

            if (usuarioDetails.getRol() != null) {
                usuario.setRol(usuarioDetails.getRol());
                System.out.println("Actualizando rol de usuario " + id + " a: " + usuarioDetails.getRol());
            }

            if (usuarioDetails.getCorreoElectronico() != null && 
                !usuario.getCorreoElectronico().equals(usuarioDetails.getCorreoElectronico())) {
                if (usuarioRepository.existsByCorreoElectronico(usuarioDetails.getCorreoElectronico())) {
                    return ApiResponse.error("El correo electronico ya esta en uso");
                }
                usuario.setCorreoElectronico(usuarioDetails.getCorreoElectronico());
            }

            if (usuarioDetails.getTelefono() != null &&
                    !usuarioDetails.getTelefono().equals(usuario.getTelefono())) {
                if (usuarioRepository.existsByTelefono(usuarioDetails.getTelefono())) {
                    return ApiResponse.error("El telefono ya esta en uso");
                }
                usuario.setTelefono(usuarioDetails.getTelefono());
            }

            if (usuarioDetails.getContrasena() != null &&
                    !usuarioDetails.getContrasena().isEmpty()) {
                usuario.setContrasena(usuarioDetails.getContrasena());
            }

            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            
            System.out.println("Usuario actualizado exitosamente:");
            System.out.println("ID: " + usuarioActualizado.getIdUsuario());
            System.out.println("Nombres: " + usuarioActualizado.getNombres());
            System.out.println("Apellidos: " + usuarioActualizado.getApellidos());
            System.out.println("Rol: " + usuarioActualizado.getRol());
            
            usuarioActualizado.setContrasena(null);

            return ApiResponse.success("Usuario actualizado exitosamente", usuarioActualizado);

        } catch (Exception e) {
            System.err.println("Error al actualizar usuario: " + e.getMessage());
            e.printStackTrace();
            return ApiResponse.error("Error al actualizar usuario: " + e.getMessage());
        }
    }

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








