package com.tusgusticos.tus_gusticos_intellij.repository;

import com.tusgusticos.tus_gusticos_intellij.model.DetallePedido;
import com.tusgusticos.tus_gusticos_intellij.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    List<DetallePedido> findByPedido(Pedido pedido);
}