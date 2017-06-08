package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 * Created by Pavel K. on 10/17/16.
 */
public class CreateCategoryCommand implements Command {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;
    private final int weight;

    public CreateCategoryCommand(UUID categoryId, String name, UUID parentCategoryId, int weight) {
        Validate.notNull(categoryId);
        Validate.notNull(name);

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
