package org.example.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletTransactionDTO {
    private Long transactionId;
    private Long walletId;
    private Double amount;
    private Date createdAt;
    private String userName;

    public WalletTransactionDTO(Long transactionId, Long walletId, Double amount, Date createdAt) {
        this.transactionId = transactionId;
        this.walletId = walletId;
        this.amount = amount;
        this.createdAt = createdAt;
    }
}
