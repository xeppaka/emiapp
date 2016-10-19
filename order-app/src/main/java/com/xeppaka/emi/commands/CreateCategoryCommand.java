package com.xeppaka.emi.commands;

import com.xeppaka.emi.domain.value.UserName;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 * Created by Pavel K. on 10/17/16.
 */
public class CreateCategoryCommand extends EmiCommand {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;

    public CreateCategoryCommand(UserName userName, UUID categoryId, String name, UUID parentCategoryId) {
        super(userName);
        Validate.notNull(categoryId);
        Validate.notNull(name);

        this.categoryId = categoryId;
        this.name = name;
        this.parentCategoryId = parentCategoryId;
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
}
