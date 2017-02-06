package com.xeppaka.emi.persistence.view;

import com.xeppaka.ddd.events.Event;
import com.xeppaka.ddd.events.EventListener;
import com.xeppaka.emi.events.*;

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
            case PRODUCT_DELETED:
                onProductDeletedEvent((ProductDeleted) emiEvent);
                break;
            case CATEGORY_DELETED:
                onCategoryDeletedEvent((CategoryDeleted) emiEvent);
                break;
            case PRODUCT_NAME_CHANGED:
                onProductNameChanged((ProductNameChanged) emiEvent);
                break;
            case PRODUCT_PRICE_CHANGED:
                onProductPriceChanged((ProductPriceChanged) emiEvent);
                break;
            case PRODUCT_CATEGORY_CHANGED:
                onProductCategoryChanged((ProductCategoryChanged) emiEvent);
                break;
            case CATEGORY_NAME_CHANGED:
                onCategoryNameChanged((CategoryNameChanged) emiEvent);
                break;
            case CATEGORY_PARENT_CHANGED:
                onCategoryParentChanged((CategoryParentChanged) emiEvent);
                break;
            case CATEGORY_WEIGHT_CHANGED:
                onCategoryWeightChanged((CategoryWeightChanged) emiEvent);
                break;
            case PRODUCT_MULTIPLICITY_CHANGED:
                onProductMultiplicityChanged((ProductMultiplicityChanged) emiEvent);
                break;
            case PRODUCT_WEIGHT_CHANGED:
                onProductWeightChanged((ProductWeightChanged) emiEvent);
                break;
            case PRODUCT_FEATURES_CHANGED:
                onProductFeaturesChanged((ProductFeaturesChanged) emiEvent);
                break;
            case PRODUCT_NOTE_CHANGED:
                onProductNoteChanged((ProductNoteChanged) emiEvent);
                break;
            case PRODUCT_IMAGE_CHANGED:
                onProductImageChanged((ProductImageChanged) emiEvent);
                break;
            default:
                throw new IllegalArgumentException(MessageFormat.format("Unknown event {0}.", event));
        }
    }

    private void onProductImageChanged(ProductImageChanged productImageChanged) {
        productsRepository.updateProductImage(productImageChanged.getProductId(), productImageChanged.getImage());
    }

    private void onProductNoteChanged(ProductNoteChanged productNoteChanged) {
        productsRepository.updateProductNote(productNoteChanged.getProductId(), productNoteChanged.getNote());
    }

    private void onProductFeaturesChanged(ProductFeaturesChanged productFeaturesChanged) {
        productsRepository.updateProductFeatures(productFeaturesChanged.getProductId(),
                productFeaturesChanged.getFeatures());
    }

    private void onProductWeightChanged(ProductWeightChanged productWeightChanged) {
        productsRepository.updateProductWeight(productWeightChanged.getProductId(), productWeightChanged.getWeight());
    }

    private void onProductMultiplicityChanged(ProductMultiplicityChanged productMultiplicityChanged) {
        productsRepository.updateProductMultiplicity(productMultiplicityChanged.getProductId(),
                productMultiplicityChanged.getMultiplicity());
    }

    private void onProductDeletedEvent(ProductDeleted productDeleted) {
        productsRepository.deleteProduct(productDeleted.getProductId());
    }

    private void onCategoryWeightChanged(CategoryWeightChanged categoryWeightChanged) {
        categoriesRepository.updateCategoryWeight(categoryWeightChanged.getCategoryId(),
                categoryWeightChanged.getWeight());
    }

    private void onCategoryParentChanged(CategoryParentChanged categoryParentChanged) {
        categoriesRepository.updateCategoryParent(categoryParentChanged.getCategoryId(),
                categoryParentChanged.getParentCategoryId());
    }

    private void onCategoryNameChanged(CategoryNameChanged categoryNameChanged) {
        categoriesRepository.updateCategoryName(categoryNameChanged.getCategoryId(),
                categoryNameChanged.getName());
    }

    private void onProductCreatedEvent(ProductCreated productCreated) {
        productsRepository.createProduct(productCreated.getProductId(),
                productCreated.getName(),
                productCreated.getPrice(),
                productCreated.getMultiplicity(),
                productCreated.getNote(),
                productCreated.getCategoryId(),
                productCreated.getFeatures(),
                productCreated.getImage(),
                productCreated.getWeight());
    }

    private void onCategoryDeletedEvent(CategoryDeleted categoryDeleted) {
        categoriesRepository.deleteCategory(categoryDeleted.getCategoryId());
    }

    private void onProductCategoryChanged(ProductCategoryChanged productCategoryChanged) {
        productsRepository.updateProductCategory(productCategoryChanged.getProductId(), productCategoryChanged.getCategoryId());
    }

    private void onCategoryCreatedEvent(CategoryCreated categoryCreated) {
        categoriesRepository.createCategory(categoryCreated.getCategoryId(),
                categoryCreated.getName(),
                categoryCreated.getParentCategoryId(),
                categoryCreated.getWeight());
    }

    private void onProductNameChanged(ProductNameChanged productNameChanged) {
        productsRepository.updateProductName(productNameChanged.getProductId(), productNameChanged.getName());
    }

    private void onProductPriceChanged(ProductPriceChanged productPriceChanged) {
        productsRepository.updateProductPrice(productPriceChanged.getProductId(), productPriceChanged.getPrice());
    }
}
