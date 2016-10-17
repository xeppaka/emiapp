package com.xeppaka.emi;

import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.domain.entities.Category;
import com.xeppaka.emi.persistence.CategoriesRepository;
import com.xeppaka.emi.persistence.EmiWarehouseRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;
import java.util.EnumSet;
import java.util.UUID;

/**
 * Spring Boot application.
 */
@SpringBootApplication
public class EmiApplication {
    public static void main(String[] args) throws IOException, RepositoryException {
        final ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(EmiApplication.class, args);
        final EmiWarehouseRepository warehouseRepository = configurableApplicationContext.getBean(EmiWarehouseRepository.class);
        final CategoriesRepository categoriesRepository = configurableApplicationContext.getBean(CategoriesRepository.class);
        final EmiWarehouse emiWarehouse = warehouseRepository.find(EmiWarehouse.AGGREGATE_ID);
//        UUID categoryId1 = UUID.randomUUID();
//        UUID categoryId2 = UUID.randomUUID();
//        emiWarehouse.createCategory(categoryId1, "Category 1");
//        emiWarehouse.createCategory(categoryId2, "Category 2", categoryId1);
//        emiWarehouse.createProduct(UUID.randomUUID(), "Product 1", 10, "some note", categoryId1, EnumSet.of(ProductFeature.MAIN));
//        emiWarehouse.createProduct(UUID.randomUUID(), "Product 2", 12, "some note", categoryId2, EnumSet.of(ProductFeature.MAIN));
//        warehouseRepository.save(emiWarehouse);

//        System.out.println(emiWarehouse);

        System.out.println(categoriesRepository.createCategory("test123"));
    }
}
