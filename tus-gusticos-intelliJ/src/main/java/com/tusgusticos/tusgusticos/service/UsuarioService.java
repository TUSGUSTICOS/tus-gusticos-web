package com.tusgusticos.tusgusticos.service;

import com.tusgusticos.tusgusticos.model.Usuario;
import com.tusgusticos.tusgusticos.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public void eliminarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    public Usuario actualizarUsuario(Integer id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNombre(usuarioActualizado.getNombre());
                    usuario.setCorreo(usuarioActualizado.getCorreo());
                    usuario.setContrasena(usuarioActualizado.getContrasena());
                    usuario.setRol(usuarioActualizado.getRol());
                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}


