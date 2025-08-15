package com.tusgusticos.tus_gusticos_intellij.repository;

import com.tusgusticos.tus_gusticos_intellij.model.Pago;
import com.tusgusticos.tus_gusticos_intellij.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByPedido(Pedido pedido);
    Optional<Pago> findByPedido_IdPedido(Long idPedido);
}