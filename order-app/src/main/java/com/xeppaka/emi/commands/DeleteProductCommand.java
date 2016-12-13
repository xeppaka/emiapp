package com.xeppaka.emi.commands;

import java.util.UUID;

import com.xeppaka.ddd.commands.Command;

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
