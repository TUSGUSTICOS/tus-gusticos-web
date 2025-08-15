package com.tusgusticos.tus_gusticos_intellij.repository;

import com.tusgusticos.tus_gusticos_intellij.model.Pedido;
import com.tusgusticos.tus_gusticos_intellij.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioOrderByFechaPedidoDesc(Usuario usuario);
    List<Pedido> findByUsuario_IdUsuarioOrderByFechaPedidoDesc(Integer idUsuario);
}