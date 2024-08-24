package org.example.api.repository;

import org.example.api.entity.Wallettransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WallettransactionRepository extends JpaRepository<Wallettransaction, Long> {

    List<Wallettransaction> findByWallet_WalletId(Long walletId);
}
