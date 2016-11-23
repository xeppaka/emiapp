package com.xeppaka.emi.persistence.view;

import com.xeppaka.ddd.events.Event;
import com.xeppaka.ddd.events.EventListener;
import com.xeppaka.emi.events.*;
import com.xeppaka.emi.persistence.view.CategoriesRepository;
import com.xeppaka.emi.persistence.view.ProductsRepository;
import org.apache.commons.lang3.Validate;

import java.text.MessageFormat;

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
            case PRODUCT_NAME_CHANGED:
                onProductNameChanged((ProductNameChanged) emiEvent);
                break;
            case PRODUCT_PRICE_CHANGED:
                onProductPriceChanged((ProductPriceChanged) emiEvent);
                break;
            default:
                throw new IllegalArgumentException(MessageFormat.format("Unknown event {0}.", event));
        }
    }

    private void onProductCreatedEvent(ProductCreated productCreated) {
        productsRepository.createProduct(productCreated.getProductId(),
                productCreated.getName(),
                productCreated.getPrice(),
                productCreated.getMultiplicity(),
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

    private void onProductNameChanged(ProductNameChanged productNameChanged) {
        productsRepository.updateProductName(productNameChanged.getProductId(), productNameChanged.getNewName());
    }

    private void onProductPriceChanged(ProductPriceChanged productPriceChanged) {
        productsRepository.updateProductPrice(productPriceChanged.getProductId(), productPriceChanged.getNewPrice());
    }
}
