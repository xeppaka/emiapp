package com.xeppaka.emi.domain;

import com.xeppaka.ddd.commands.Command;
import com.xeppaka.ddd.domain.BaseAggregate;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.commands.DeleteCategoryCommand;
import com.xeppaka.emi.commands.DeleteProductCommand;
import com.xeppaka.emi.commands.UpdateCategoryCommand;
import com.xeppaka.emi.commands.UpdateProductCommand;
import com.xeppaka.emi.domain.entities.Category;
import com.xeppaka.emi.domain.entities.Product;
import com.xeppaka.emi.events.*;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
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
            case PRODUCT_CREATED:
                applyProductCreated((ProductCreated) emiEvent);
                break;
            case CATEGORY_CREATED:
                applyCategoryCreated((CategoryCreated) emiEvent);
                break;
            case CATEGORY_DELETED:
                applyCategoryDeleted((CategoryDeleted) emiEvent);
                break;
            case PRODUCT_DELETED:
                applyProductDeleted((ProductDeleted) emiEvent);
                break;
            case PRODUCT_NAME_CHANGED:
                applyProductNameChanged((ProductNameChanged) emiEvent);
                break;
            case PRODUCT_PRICE_CHANGED:
                applyProductPriceChanged((ProductPriceChanged) emiEvent);
                break;
            case PRODUCT_MULTIPLICITY_CHANGED:
                applyProductMultiplicityChanged((ProductMultiplicityChanged) emiEvent);
                break;
            case PRODUCT_FEATURES_CHANGED:
                applyProductFeaturesChanged((ProductFeaturesChanged) emiEvent);
                break;
            case PRODUCT_NOTE_CHANGED:
                applyProductNoteChanged((ProductNoteChanged) emiEvent);
                break;
            case PRODUCT_WEIGHT_CHANGED:
                applyProductWeightChanged((ProductWeightChanged) emiEvent);
                break;
            case PRODUCT_CATEGORY_CHANGED:
                applyProductCategoryChanged((ProductCategoryChanged) emiEvent);
                break;
            case CATEGORY_NAME_CHANGED:
                applyCategoryNameChanged((CategoryNameChanged) emiEvent);
                break;
            case CATEGORY_PARENT_CHANGED:
                applyCategoryParentChanged((CategoryParentChanged) emiEvent);
                break;
            case CATEGORY_WEIGHT_CHANGED:
                applyCategoryWeightChanged((CategoryWeightChanged) emiEvent);
                break;
            default:
                throw new IllegalArgumentException(MessageFormat.format("Unknown event: {0}.", event));
        }
    }

    private void applyProductWeightChanged(ProductWeightChanged productWeightChanged) {
        final Product product = productsMap.get(productWeightChanged.getProductId());
        product.setWeight(productWeightChanged.getWeight());
    }

    private void applyProductNoteChanged(ProductNoteChanged productNoteChanged) {
        final Product product = productsMap.get(productNoteChanged.getProductId());
        product.setNote(productNoteChanged.getNote());
    }

    private void applyProductFeaturesChanged(ProductFeaturesChanged productFeaturesChanged) {
        final Product product = productsMap.get(productFeaturesChanged.getProductId());
        product.setFeatures(productFeaturesChanged.getFeatures());
    }

    private void applyProductMultiplicityChanged(ProductMultiplicityChanged productMultiplicityChanged) {
        final Product product = productsMap.get(productMultiplicityChanged.getProductId());
        product.setMultiplicity(productMultiplicityChanged.getMultiplicity());
    }

    private void applyProductDeleted(ProductDeleted productDeleted) {
        productsMap.remove(productDeleted.getProductId());
    }

    private void applyCategoryDeleted(CategoryDeleted categoryDeleted) {
        categoryMap.remove(categoryDeleted.getCategoryId());
    }

    private void applyProductCategoryChanged(ProductCategoryChanged productCategoryChanged) {
        final Product product = productsMap.get(productCategoryChanged.getProductId());
        product.setCategoryId(productCategoryChanged.getCategoryId());
    }

    private void applyCategoryWeightChanged(CategoryWeightChanged categoryWeightChanged) {
        final Category category = categoryMap.get(categoryWeightChanged.getCategoryId());
        category.setWeight(categoryWeightChanged.getWeight());
    }

    private void applyCategoryParentChanged(CategoryParentChanged categoryParentChanged) {
        final Category category = categoryMap.get(categoryParentChanged.getCategoryId());
        category.setParentCategoryId(categoryParentChanged.getParentCategoryId());
    }

    private void applyCategoryNameChanged(CategoryNameChanged categoryNameChanged) {
        final Category category = categoryMap.get(categoryNameChanged.getCategoryId());
        category.setName(categoryNameChanged.getName());
    }

    private void applyProductCreated(ProductCreated createProductEvent) {
        productsMap.put(createProductEvent.getProductId(),
                new Product(createProductEvent.getProductId(),
                        createProductEvent.getName(),
                        createProductEvent.getPrice(),
                        createProductEvent.getMultiplicity(),
                        createProductEvent.getCategoryId(),
                        createProductEvent.getNote(),
                        createProductEvent.getWeight(),
                        createProductEvent.getFeatures()));
    }

    private void applyProductNameChanged(ProductNameChanged productNameChangedEvent) {
        final UUID productId = productNameChangedEvent.getProductId();
        final Product product = productsMap.get(productId);
        product.setName(productNameChangedEvent.getName());
    }

    private void applyProductPriceChanged(ProductPriceChanged productPriceChangedEvent) {
        final UUID productId = productPriceChangedEvent.getProductId();
        final Product product = productsMap.get(productId);
        product.setPrice(productPriceChangedEvent.getPrice());
    }

    private void applyCategoryCreated(CategoryCreated categoryCreatedEvent) {
        final Category newCategory = new Category(categoryCreatedEvent.getCategoryId(),
                categoryCreatedEvent.getName(),
                categoryCreatedEvent.getParentCategoryId(),
                categoryCreatedEvent.getWeight());
        categoryMap.put(newCategory.getId(), newCategory);
    }

    public <T extends Command> void handle(T command) {
        if (command instanceof CreateCategoryCommand) {
            handle((CreateCategoryCommand) command);
            return;
        }

        if (command instanceof CreateProductCommand) {
            handle((CreateProductCommand) command);
            return;
        }

        if (command instanceof UpdateProductCommand) {
            handle((UpdateProductCommand) command);
            return;
        }

        if (command instanceof UpdateCategoryCommand) {
            handle((UpdateCategoryCommand) command);
            return;
        }

        if (command instanceof DeleteCategoryCommand) {
            handle((DeleteCategoryCommand) command);
            return;
        }

        if (command instanceof DeleteProductCommand) {
            handle((DeleteProductCommand) command);
            return;
        }

        throw new IllegalArgumentException(MessageFormat.format("Provided command {0} is not supported", command));
    }

    public void handle(CreateProductCommand command) {
        final ProductCreated productCreated = new ProductCreated(command.getProductId(),
                command.getName(),
                command.getPrice(),
                command.getMultiplicity(),
                command.getNote(),
                command.getCategoryId(),
                command.getFeatures(),
                command.getWeight());

        apply(productCreated);
        addEvent(productCreated);
    }

    public void handle(CreateCategoryCommand command) {
        final CategoryCreated categoryCreated = new CategoryCreated(command.getCategoryId(),
                command.getName(),
                command.getParentCategoryId(),
                command.getWeight());

        apply(categoryCreated);
        addEvent(categoryCreated);
    }

    private void handle(UpdateProductCommand command) {
        final Product originalProduct = productsMap.get(command.getProductId());
        final String name = command.getName();
        final int price = command.getPrice();
        final int multiplicity = command.getMultiplicity();
        final UUID categoryId = command.getCategoryId();
        final String note = command.getNote();
        final int weight = command.getWeight();
        final Set<ProductFeature> features = command.getFeatures();

        if (!originalProduct.getName().equals(name)) {
            final ProductNameChanged productNameChanged =
                    new ProductNameChanged(originalProduct.getId(), name);
            apply(productNameChanged);
            addEvent(productNameChanged);
        }

        if (originalProduct.getPrice() != price) {
            final ProductPriceChanged productPriceChanged =
                    new ProductPriceChanged(originalProduct.getId(), price);
            apply(productPriceChanged);
            addEvent(productPriceChanged);
        }

        if (!originalProduct.getCategoryId().equals(categoryId)) {
            final ProductCategoryChanged productCategoryChanged =
                    new ProductCategoryChanged(originalProduct.getId(), categoryId);
            apply(productCategoryChanged);
            addEvent(productCategoryChanged);
        }

        if (originalProduct.getMultiplicity() != multiplicity) {
            final ProductMultiplicityChanged productMultiplicityChanged =
                    new ProductMultiplicityChanged(originalProduct.getId(), multiplicity);
            apply(productMultiplicityChanged);
            addEvent(productMultiplicityChanged);
        }

        if (!originalProduct.getNote().equals(note)) {
            final ProductNoteChanged productNoteChanged =
                    new ProductNoteChanged(originalProduct.getId(), note);
            apply(productNoteChanged);
            addEvent(productNoteChanged);
        }

        if (!originalProduct.getFeatures().equals(features)) {
            final ProductFeaturesChanged productFeaturesChanged =
                    new ProductFeaturesChanged(originalProduct.getId(), features);
            apply(productFeaturesChanged);
            addEvent(productFeaturesChanged);
        }

        if (originalProduct.getWeight() != weight) {
            final ProductWeightChanged productWeightChanged =
                    new ProductWeightChanged(originalProduct.getId(), weight);
            apply(productWeightChanged);
            addEvent(productWeightChanged);
        }
    }

    private void handle(UpdateCategoryCommand command) {
        final Category originalCategory = categoryMap.get(command.getCategoryId());
        final String name = command.getName();
        final UUID parentCategoryId = command.getParentCategoryId();
        final int weight = command.getWeight();

        if (!originalCategory.getName().equals(name)) {
            final CategoryNameChanged categoryNameChanged =
                    new CategoryNameChanged(originalCategory.getId(), name);
            apply(categoryNameChanged);
            addEvent(categoryNameChanged);
        }

        if (!originalCategory.getParentCategoryId().equals(parentCategoryId)) {
            final CategoryParentChanged categoryParentChanged = new CategoryParentChanged(originalCategory.getId(),
                    parentCategoryId);
            apply(categoryParentChanged);
            addEvent(categoryParentChanged);
        }

        if (originalCategory.getWeight() != weight) {
            final CategoryWeightChanged categoryWeightChanged = new CategoryWeightChanged(originalCategory.getId(),
                    weight);
            apply(categoryWeightChanged);
            addEvent(categoryWeightChanged);
        }
    }

    private void handle(DeleteCategoryCommand command) {
        final CategoryDeleted categoryDeleted = new CategoryDeleted(command.getCategoryId());
        apply(categoryDeleted);
        addEvent(categoryDeleted);
    }

    private void handle(DeleteProductCommand command) {
        final ProductDeleted productDeleted = new ProductDeleted(command.getProductId());
        apply(productDeleted);
        addEvent(productDeleted);
    }

    @Override
    public String toString() {
        return "EmiWarehouse{" +
                "productsMap=" + productsMap +
                ", categoryMap=" + categoryMap +
                '}';
    }
}
