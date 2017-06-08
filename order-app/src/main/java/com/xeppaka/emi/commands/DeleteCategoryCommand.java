package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;

import java.util.UUID;

/**
 *
 */
public class DeleteCategoryCommand implements Command {
    private UUID categoryId;

    public DeleteCategoryCommand(UUID categoryId) {
        this.categoryId = categoryId;
    }

    public UUID getCategoryId() {
        return categoryId;
    }
}
