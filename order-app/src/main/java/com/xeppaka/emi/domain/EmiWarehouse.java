package com.xeppaka.emi.domain;

import com.xeppaka.ddd.commands.Command;
import com.xeppaka.ddd.domain.BaseAggregate;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.commands.DeleteCategoryCommand;
import com.xeppaka.emi.commands.DeleteProductCommand;
import com.xeppaka.emi.commands.SendOrderCommand;
import com.xeppaka.emi.commands.UpdateCategoryCommand;
import com.xeppaka.emi.commands.UpdateProductCommand;
import com.xeppaka.emi.domain.entities.Category;
import com.xeppaka.emi.domain.entities.Order;
import com.xeppaka.emi.domain.entities.Product;
import com.xeppaka.emi.domain.value.OrderProduct;
import com.xeppaka.emi.events.CategoryCreated;
import com.xeppaka.emi.events.CategoryDeleted;
import com.xeppaka.emi.events.CategoryNameChanged;
import com.xeppaka.emi.events.CategoryParentChanged;
import com.xeppaka.emi.events.CategoryWeightChanged;
import com.xeppaka.emi.events.EmiEvent;
import com.xeppaka.emi.events.ProductCategoryChanged;
import com.xeppaka.emi.events.ProductCreated;
import com.xeppaka.emi.events.ProductDeleted;
import com.xeppaka.emi.events.ProductFeaturesChanged;
import com.xeppaka.emi.events.ProductImageChanged;
import com.xeppaka.emi.events.ProductImageThumbnailChanged;
import com.xeppaka.emi.events.ProductMultiplicityChanged;
import com.xeppaka.emi.events.ProductNameChanged;
import com.xeppaka.emi.events.ProductNoteChanged;
import com.xeppaka.emi.events.ProductPriceChanged;
import com.xeppaka.emi.events.ProductWeightChanged;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 */
public class EmiWarehouse extends BaseAggregate {
    private static final Logger log = LoggerFactory.getLogger(EmiWarehouse.class);

    public static final UUID AGGREGATE_ID = UUID.fromString("28612f4e-448b-4483-8f1d-6f9e2b376cee");
    private Map<UUID, Product> productsMap = new ConcurrentHashMap<>();
    private Map<UUID, Category> categoryMap = new ConcurrentHashMap<>();

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
            case PRODUCT_IMAGE_THUMBNAIL_CHANGED:
                applyProductImageThumbnailChanged((ProductImageThumbnailChanged) emiEvent);
                break;
            case PRODUCT_IMAGE_CHANGED:
                applyProductImageChanged((ProductImageChanged) emiEvent);
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

    private void applyProductImageThumbnailChanged(ProductImageThumbnailChanged productImageThumbnailChanged) {
        final Product product = productsMap.get(productImageThumbnailChanged.getProductId());
        product.setImageThumbnail(productImageThumbnailChanged.getImageThumbnail());
    }

    private void applyProductImageChanged(ProductImageChanged productImageChanged) {
        final Product product = productsMap.get(productImageChanged.getProductId());
        product.setImage(productImageChanged.getImage());
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
                        createProductEvent.getFeatures(),
                        createProductEvent.getImageThumbnail(),
                        createProductEvent.getImage()));
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

        if (command instanceof SendOrderCommand) {
            handle((SendOrderCommand) command);
            return;
        }

        throw new IllegalArgumentException(MessageFormat.format("Provided command {0} is not supported", command));
    }

    public void handle(CreateProductCommand createProductCommand) {
        final ProductCreated productCreated = new ProductCreated(createProductCommand.getProductId(),
                createProductCommand.getName(),
                createProductCommand.getPrice(),
                createProductCommand.getMultiplicity(),
                createProductCommand.getNote(),
                createProductCommand.getCategoryId(),
                createProductCommand.getFeatures(),
                createProductCommand.getImageThumbnail(),
                createProductCommand.getImage(),
                createProductCommand.getWeight());

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

    private void handle(UpdateProductCommand updateProductCommand) {
        log.info("Modifying product: '{}'.", updateProductCommand.getName());

        final Product originalProduct = productsMap.get(updateProductCommand.getProductId());
        final String name = updateProductCommand.getName();
        final int price = updateProductCommand.getPrice();
        final int multiplicity = updateProductCommand.getMultiplicity();
        final UUID categoryId = updateProductCommand.getCategoryId();
        final String note = updateProductCommand.getNote();
        final int weight = updateProductCommand.getWeight();
        final Set<ProductFeature> features = updateProductCommand.getFeatures();
        final String image = updateProductCommand.getImage();
        final String imageThumbnail = updateProductCommand.getImageThumbnail();

        if (!originalProduct.getName().equals(name)) {
            log.info("Changing product name: from '{}' to '{}'.", originalProduct.getName(), name);

            final ProductNameChanged productNameChanged =
                    new ProductNameChanged(originalProduct.getId(), name);
            apply(productNameChanged);
            addEvent(productNameChanged);
        }

        if (originalProduct.getPrice() != price) {
            log.info("Changing product price: from {} to {}.", originalProduct.getPrice(), price);

            final ProductPriceChanged productPriceChanged =
                    new ProductPriceChanged(originalProduct.getId(), price);
            apply(productPriceChanged);
            addEvent(productPriceChanged);
        }

        if (!originalProduct.getCategoryId().equals(categoryId)) {
            log.info("Changing product category id: from '{}' to '{}'.", originalProduct.getCategoryId(), categoryId);

            final ProductCategoryChanged productCategoryChanged =
                    new ProductCategoryChanged(originalProduct.getId(), categoryId);
            apply(productCategoryChanged);
            addEvent(productCategoryChanged);
        }

        if (originalProduct.getMultiplicity() != multiplicity) {
            log.info("Changing product multiplicity: from {} to {}.", originalProduct.getMultiplicity(), multiplicity);

            final ProductMultiplicityChanged productMultiplicityChanged =
                    new ProductMultiplicityChanged(originalProduct.getId(), multiplicity);
            apply(productMultiplicityChanged);
            addEvent(productMultiplicityChanged);
        }

        if (!originalProduct.getNote().equals(note)) {
            log.info("Changing product note: from '{}' to '{}'.", originalProduct.getNote(), note);

            final ProductNoteChanged productNoteChanged =
                    new ProductNoteChanged(originalProduct.getId(), note);
            apply(productNoteChanged);
            addEvent(productNoteChanged);
        }

        if (!originalProduct.getFeatures().equals(features)) {
            log.info("Changing product features: from '{}' to '{}'.", originalProduct.getFeatures(), features);

            final ProductFeaturesChanged productFeaturesChanged =
                    new ProductFeaturesChanged(originalProduct.getId(), features);
            apply(productFeaturesChanged);
            addEvent(productFeaturesChanged);
        }

        if (!originalProduct.getImageThumbnail().equals(imageThumbnail)) {
            log.info("Changing product image thumbnail: from '{}' to '{}'.", originalProduct.getImageThumbnail(), imageThumbnail);

            final ProductImageThumbnailChanged productImageThumbnailChanged =
                    new ProductImageThumbnailChanged(originalProduct.getId(), imageThumbnail);
            apply(productImageThumbnailChanged);
            addEvent(productImageThumbnailChanged);
        }

        if (!originalProduct.getImage().equals(image)) {
            log.info("Changing product image: from '{}' to '{}'.", originalProduct.getImage(), image);

            final ProductImageChanged productImageChanged =
                    new ProductImageChanged(originalProduct.getId(), image);
            apply(productImageChanged);
            addEvent(productImageChanged);
        }

        if (originalProduct.getWeight() != weight) {
            log.info("Changing product weight: from {} to {}.", originalProduct.getWeight(), weight);

            final ProductWeightChanged productWeightChanged =
                    new ProductWeightChanged(originalProduct.getId(), weight);
            apply(productWeightChanged);
            addEvent(productWeightChanged);
        }
    }

    private void handle(UpdateCategoryCommand updateCategoryCommand) {
        log.info("Modifying category: '{}'.", updateCategoryCommand.getName());

        final Category originalCategory = categoryMap.get(updateCategoryCommand.getCategoryId());
        final String name = updateCategoryCommand.getName();
        final UUID parentCategoryId = updateCategoryCommand.getParentCategoryId();
        final int weight = updateCategoryCommand.getWeight();

        if (!originalCategory.getName().equals(name)) {
            log.info("Changing category name: from '{}' to '{}'.", originalCategory.getName(), name);

            final CategoryNameChanged categoryNameChanged =
                    new CategoryNameChanged(originalCategory.getId(), name);
            apply(categoryNameChanged);
            addEvent(categoryNameChanged);
        }

        if (!originalCategory.getParentCategoryId().equals(parentCategoryId)) {
            log.info("Changing category parent: from '{}' to '{}'.", originalCategory.getParentCategoryId(), parentCategoryId);

            final CategoryParentChanged categoryParentChanged = new CategoryParentChanged(originalCategory.getId(),
                    parentCategoryId);
            apply(categoryParentChanged);
            addEvent(categoryParentChanged);
        }

        if (originalCategory.getWeight() != weight) {
            log.info("Changing category weight: from {} to {}.", originalCategory.getWeight(), weight);

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

    private void handle(SendOrderCommand command) {
        final List<OrderProduct> orderProducts = new ArrayList<>(command.getProductsQuantity().size());

        for (Map.Entry<UUID, Integer> productQuantity : command.getProductsQuantity().entrySet()) {
            final Product p = productsMap.get(productQuantity.getKey());
            final Category c = categoryMap.get(p.getCategoryId());
            orderProducts.add(new OrderProduct(p.getId(), p.getName(), p.getPrice(),
                    c.getName(), productQuantity.getValue(), isMain(p.getId()), isCertificate(p.getId()), p.hasFeature(ProductFeature.FLAMMABLE)));
        }

        new Order(command.getEmail(), command.getCountry(), orderProducts).send();
    }

    private boolean isMain(UUID productId) {
        final Product product = productsMap.get(productId);
        return !isCategoryUnderPos(product.getCategoryId());
    }

    private boolean isCategoryUnderPos(UUID categoryId) {
        if (Category.ROOT_CATEGORY_ID.equals(categoryId)) {
            return false;
        }

        final Category category = categoryMap.get(categoryId);
        final Category parentCategory = categoryMap.get(category.getParentCategoryId());

        return (category.getName().equalsIgnoreCase("POS") && parentCategory.getId().equals(Category.ROOT_CATEGORY_ID)) || isCategoryUnderPos(parentCategory.getId());
    }

    private boolean isCertificate(UUID productId) {
        final Product product = productsMap.get(productId);
        return isCategoryUnderCertificate(product.getCategoryId());
    }

    private boolean isCategoryUnderCertificate(UUID categoryId) {
        if (Category.ROOT_CATEGORY_ID.equals(categoryId)) {
            return false;
        }

        final Category category = categoryMap.get(categoryId);
        final Category parentCategory = categoryMap.get(category.getParentCategoryId());

        return (category.getName().equalsIgnoreCase("Certificates") && parentCategory.getId().equals(Category.ROOT_CATEGORY_ID)) || isCategoryUnderCertificate(parentCategory.getId());
    }

    @Override
    public String toString() {
        return "EmiWarehouse{" +
                "productsMap=" + productsMap +
                ", categoryMap=" + categoryMap +
                '}';
    }

    public String summary() {
        return MessageFormat.format("EmiWarehouse aggregate (id={0}):\nproducts: {1}\ncategories: {2}\n",
                AGGREGATE_ID.toString(),
                productsMap.size(), categoryMap.size());
    }
}
