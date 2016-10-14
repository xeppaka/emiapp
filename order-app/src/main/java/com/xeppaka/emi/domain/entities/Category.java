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
    private final String name;
    private final List<UUID> childCategoryIds = new ArrayList<>();
    private final List<UUID> unmodifiableChildCategoryIds = Collections.unmodifiableList(childCategoryIds);

    public Category(UUID id, String name) {
        this(id, name, Collections.emptyList());
    }

    public Category(UUID id, String name, Collection<UUID> childCategoryIds) {
        super(id);
        Validate.notNull(name);

        this.name = name;
        this.childCategoryIds.addAll(childCategoryIds);
    }

    public String getName() {
        return name;
    }

    public void addChildCategory(UUID childCategoryId) {
        childCategoryIds.add(childCategoryId);
    }

    public void removeChildCategory(UUID childCategoryId) {
        childCategoryIds.remove(childCategoryId);
    }

    public List<UUID> getChildCategoryIds() {
        return unmodifiableChildCategoryIds;
    }
}
