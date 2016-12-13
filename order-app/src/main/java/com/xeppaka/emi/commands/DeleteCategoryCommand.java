package com.xeppaka.emi.commands;

import java.util.UUID;

import com.xeppaka.ddd.commands.Command;

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
