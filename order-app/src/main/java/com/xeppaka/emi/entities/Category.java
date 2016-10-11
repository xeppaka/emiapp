package com.xeppaka.emi.entities;

import com.xeppaka.ddd.domain.Entity;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 * Created by nnm on 10/11/16.
 */
public class Category extends Entity {
    private String name;
    private Category parentCategory;

    public Category(UUID id, String name, Category parentCategory) {
        super(id);
        Validate.notNull(name);

        this.name = name;
        this.parentCategory = parentCategory;
    }

    public String getName() {
        return name;
    }

    public Category getParentCategory() {
        return parentCategory;
    }
}
