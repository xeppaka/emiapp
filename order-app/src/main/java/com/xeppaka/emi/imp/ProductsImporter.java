package com.xeppaka.emi.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.domain.ProductFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class ProductsImporter {
    private static final Logger log = LoggerFactory.getLogger(ProductsImporter.class);
    private JsonCategory rootCategory = new JsonCategory(UUID.randomUUID(), "Product Categories");

    private List<JsonProduct> readProducts(Path jsonFile) throws IOException {
        final ObjectMapper objectMapper = new ObjectMapper();
        JsonProducts jsonProducts = objectMapper.readValue(jsonFile.toFile(), JsonProducts.class);

        return jsonProducts.getProductsList();
    }

    public void doImport(EmiWarehouse emiWarehouse) throws IOException {
        List<JsonProduct> products = readProducts(Paths.get("/home/nnm/development/emi-app/server/products.json"));

        for (JsonProduct p : products) {
            String[] categoryNames = p.getCategory().split(":");
            JsonCategory childCategory = rootCategory.getCategory(categoryNames);
        }

        createCategories(emiWarehouse, null, rootCategory);

        for (JsonProduct p : products) {
            log.debug("Create imported product: {}", p);

            String[] cats = p.getCategory().split(":");
            JsonCategory category = rootCategory.getCategory(cats);
            Set<ProductFeature> features = EnumSet.noneOf(ProductFeature.class);
            if (p.getType().equalsIgnoreCase("MAIN")) {
                features.add(ProductFeature.MAIN);
            } else if (p.getType().equalsIgnoreCase("POS")) {
                features.add(ProductFeature.POS);
            }
            emiWarehouse.handle(new CreateProductCommand(UUID.randomUUID(), p.getName(), (int) (p.getPrice() * 100), p.getMultiplicity(), p.getNote(), category.getCategoryId(), features, 0));
        }
    }

    private void createCategories(EmiWarehouse emiWarehouse, UUID parentCategory, JsonCategory category) {
        log.debug("Create imported category: {}", category);

        emiWarehouse.handle(new CreateCategoryCommand(category.getCategoryId(), category.getName(), parentCategory, 0));

        for (JsonCategory c : category.getChildCategories()) {
            createCategories(emiWarehouse, category.getCategoryId(), c);
        }
    }
}
