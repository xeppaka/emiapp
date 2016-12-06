package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;

import java.util.UUID;

/**
 * Created by nnm on 11/20/16.
 */
public class UpdateProductCommand implements Command {
    private final UUID id;
    private final String name;
    private final int price;
    private final UUID categoryId;

    public UpdateProductCommand(UUID id, String name, int price, UUID categoryId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public UUID getCategoryId() {
        return categoryId;
    }
}
