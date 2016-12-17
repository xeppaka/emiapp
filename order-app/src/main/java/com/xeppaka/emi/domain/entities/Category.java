package com.xeppaka.emi.domain.entities;

import com.xeppaka.ddd.domain.BaseEntity;
import org.apache.commons.lang3.Validate;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 *
 */
public class Category extends BaseEntity {
    public static final UUID ROOT_CATEGORY_ID = UUID.fromString("249e2189-8e76-4cb8-a682-662c8ae44392");
    public static final String ROOT_CATEGORY_NAME = "Product Categories";

    private String name;
    private UUID parentCategoryId;
    private int weight;

    public Category(UUID id, String name, UUID parentCategoryId, int weight) {
        super(id);

        this.name = name;
        this.parentCategoryId = parentCategoryId;
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(UUID parentCategoryId) {
        this.parentCategoryId = parentCategoryId;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
