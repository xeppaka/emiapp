package com.xeppaka.emi.persistence;

import com.xeppaka.ddd.events.Event;
import com.xeppaka.ddd.events.EventListener;
import com.xeppaka.emi.events.CategoryCreated;
import com.xeppaka.emi.events.EmiEvent;
import com.xeppaka.emi.events.ProductCreated;
import org.apache.commons.lang3.Validate;

/**
 *
 */
public class EmiEventPersistenceListener implements EventListener {
    private ProductsRepository productsRepository;
    private CategoriesRepository categoriesRepository;

    public EmiEventPersistenceListener(ProductsRepository productsRepository, CategoriesRepository categoriesRepository) {
        Validate.notNull(productsRepository);
        Validate.notNull(categoriesRepository);

        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    public void onEvent(Event event) {
        final EmiEvent emiEvent = (EmiEvent) event;

        switch (emiEvent.getType()) {
            case PRODUCT_CREATED:
                onProductCreatedEvent((ProductCreated) emiEvent);
                break;
            case CATEGORY_CREATED:
                onCategoryCreatedEvent((CategoryCreated) emiEvent);
                break;
        }
    }

    private void onProductCreatedEvent(ProductCreated productCreated) {
        productsRepository.createProduct(productCreated.getProductId(),
                productCreated.getName(),
                productCreated.getPrice(),
                productCreated.getNote(),
                productCreated.getCategoryId(),
                productCreated.getFeatures(),
                productCreated.isVisible());
    }

    private void onCategoryCreatedEvent(CategoryCreated categoryCreated) {
        categoriesRepository.createCategory(categoryCreated.getCategoryId(),
                categoryCreated.getName(),
                categoryCreated.getParentCategoryId());
    }
}
