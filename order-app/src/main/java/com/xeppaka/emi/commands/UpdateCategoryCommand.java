package com.xeppaka.emi.commands;

import java.util.UUID;

import com.xeppaka.ddd.commands.Command;

/**
 *
 */
public class UpdateCategoryCommand implements Command {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;
    private final int weight;

    public UpdateCategoryCommand(UUID categoryId, String name, UUID parentCategoryId, int weight) {
        this.categoryId = categoryId;
        this.name = name;
        this.parentCategoryId = parentCategoryId;
        this.weight = weight;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public String getName() {
        return name;
    }

    public UUID getParentCategoryId() {
        return parentCategoryId;
    }

    public int getWeight() {
        return weight;
    }
}
