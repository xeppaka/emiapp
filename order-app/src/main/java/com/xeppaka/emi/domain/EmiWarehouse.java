package com.xeppaka.emi.domain;

import com.xeppaka.ddd.domain.BaseAggregate;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.emi.domain.entities.Category;
import com.xeppaka.emi.domain.entities.Product;
import com.xeppaka.emi.events.CategoryCreated;
import com.xeppaka.emi.events.EmiEvent;
import com.xeppaka.emi.events.ProductCreated;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 *
 */
public class EmiWarehouse extends BaseAggregate {
    public static final UUID AGGREGATE_ID = UUID.fromString("28612f4e-448b-4483-8f1d-6f9e2b376cee");
    private Map<UUID, Product> productsMap = new HashMap<>();
    private Map<UUID, Category> categoryMap = new HashMap<>();

    public EmiWarehouse() {
        super(AGGREGATE_ID);
    }

    @Override
    public <E extends Event> void apply(E event) {
        final EmiEvent emiEvent = (EmiEvent) event;

        switch (emiEvent.getType()) {
            case PRODUCT_CREATED: {
                applyProductCreated((ProductCreated) emiEvent);
            }
            case CATEGORY_CREATED: {
                applyCategoryCreated((CategoryCreated) emiEvent);
            }
        }
    }

    private void applyProductCreated(ProductCreated createProductEvent) {
        productsMap.put(createProductEvent.getProductId(),
                new Product(createProductEvent.getProductId(),
                        createProductEvent.getName(),
                        createProductEvent.getPrice(),
                        createProductEvent.getNote(),
                        createProductEvent.getCategoryId(),
                        createProductEvent.getFeatures()));
    }

    private void applyCategoryCreated(CategoryCreated categoryCreatedEvent) {
        final Category newCategory = new Category(categoryCreatedEvent.getCategoryId(), categoryCreatedEvent.getName());
        categoryMap.put(newCategory.getId(), newCategory);

        if (categoryCreatedEvent.getParentCategoryId() != null) {
            final Category parentCategory = categoryMap.get(categoryCreatedEvent.getParentCategoryId());
            if (parentCategory != null) {
                parentCategory.addChildCategory(newCategory.getId());
            }
        }
    }

    public void createProduct(UUID productId, String name, double price, String note, UUID categoryId, Collection<ProductFeature> features) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);
        Validate.notNull(categoryId);
        Validate.notNull(features);

        addEvent(new ProductCreated(productId, name, price, note, categoryId, features));
    }

    public void createCategory(UUID categoryId, String name) {
        Validate.notNull(categoryId);
        Validate.notNull(name);

        addEvent(new CategoryCreated(categoryId, name, null));
    }

    public void createCategory(UUID categoryId, String name, UUID parentCategoryId) {
        Validate.notNull(categoryId);
        Validate.notNull(name);
        Validate.notNull(parentCategoryId);

        addEvent(new CategoryCreated(categoryId, name, parentCategoryId));
    }

    @Override
    public String toString() {
        return "EmiWarehouse{" +
                "productsMap=" + productsMap +
                ", categoryMap=" + categoryMap +
                '}';
    }
}
