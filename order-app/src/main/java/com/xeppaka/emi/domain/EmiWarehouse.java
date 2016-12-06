package com.xeppaka.emi.domain;

import com.xeppaka.ddd.commands.Command;
import com.xeppaka.ddd.domain.BaseAggregate;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.commands.UpdateCategoryCommand;
import com.xeppaka.emi.commands.UpdateProductCommand;
import com.xeppaka.emi.domain.entities.Category;
import com.xeppaka.emi.domain.entities.Product;
import com.xeppaka.emi.events.*;

import java.text.MessageFormat;
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
            case PRODUCT_CREATED:
                applyProductCreated((ProductCreated) emiEvent);
                break;
            case CATEGORY_CREATED:
                applyCategoryCreated((CategoryCreated) emiEvent);
                break;
            case PRODUCT_NAME_CHANGED:
                applyProductNameChanged((ProductNameChanged) emiEvent);
                break;
            case PRODUCT_PRICE_CHANGED:
                applyProductPriceChanged((ProductPriceChanged) emiEvent);
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
        category.setName(categoryNameChanged.getNewName());
    }

    private void applyProductCreated(ProductCreated createProductEvent) {
        productsMap.put(createProductEvent.getProductId(),
                new Product(createProductEvent.getProductId(),
                        createProductEvent.getName(),
                        createProductEvent.getPrice(),
                        createProductEvent.getNote(),
                        createProductEvent.getCategoryId(),
                        createProductEvent.getWeight(),
                        createProductEvent.getFeatures()));
    }

    private void applyProductNameChanged(ProductNameChanged productNameChangedEvent) {
        final UUID productId = productNameChangedEvent.getProductId();
        final Product product = productsMap.get(productId);
        product.setName(productNameChangedEvent.getNewName());
    }

    private void applyProductPriceChanged(ProductPriceChanged productPriceChangedEvent) {
        final UUID productId = productPriceChangedEvent.getProductId();
        final Product product = productsMap.get(productId);
        product.setPrice(productPriceChangedEvent.getNewPrice());
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

    public void handle(UpdateProductCommand command) {
        final Product originalProduct = productsMap.get(command.getId());
        final String name = command.getName();
        final int price = command.getPrice();
        final UUID categoryId = command.getCategoryId();

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
    }

    public void handle(UpdateCategoryCommand command) {
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

    @Override
    public String toString() {
        return "EmiWarehouse{" +
                "productsMap=" + productsMap +
                ", categoryMap=" + categoryMap +
                '}';
    }
}
