package com.tusgusticos.tus_gusticos_intellij.repository;

import com.tusgusticos.tus_gusticos_intellij.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositorio para la entidad Usuario
 * Proporciona métodos para interactuar con la tabla usuarios
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    /**
     * Busca un usuario por correo electrónico
     */
    Optional<Usuario> findByCorreoElectronico(String correoElectronico);

    /**
     * Busca un usuario por teléfono
     */
    Optional<Usuario> findByTelefono(String telefono);

    /**
     * Verifica si existe un usuario con el correo dado
     */
    boolean existsByCorreoElectronico(String correoElectronico);

    /**
     * Verifica si existe un usuario con el teléfono dado
     */
    boolean existsByTelefono(String telefono);
}







