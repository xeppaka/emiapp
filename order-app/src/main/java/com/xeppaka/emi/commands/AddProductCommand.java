package com.xeppaka.emi.commands;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class AddProductCommand {
    private UUID id;
    private String name;
    private double price;

    public AddProductCommand(UUID id, String name, double price) {
        Validate.notNull(id);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);

        this.id = id;
        this.name = name;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}
