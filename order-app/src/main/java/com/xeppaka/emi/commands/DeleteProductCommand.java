package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;

import java.util.UUID;

/**
 *
 */
public class DeleteProductCommand implements Command {
    private final UUID productId;

    public DeleteProductCommand(UUID productId) {
        this.productId = productId;
    }

    public UUID getProductId() {
        return productId;
    }
}
