package com.xeppaka.emi;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.commands.AddProductCommand;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.domain.ProductFeature;
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
    public static void main(String[] args) throws CommandHandleException {
        final ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(EmiApplication.class, args);
        final EmiWarehouseRepository warehouseRepository = configurableApplicationContext.getBean(EmiWarehouseRepository.class);
        final CategoriesRepository categoriesRepository = configurableApplicationContext.getBean(CategoriesRepository.class);
        final EmiCommandHandler emiCommandHandler = configurableApplicationContext.getBean(EmiCommandHandler.class);
//        final EmiWarehouse emiWarehouse = warehouseRepository.find(EmiWarehouse.AGGREGATE_ID);

        emiCommandHandler.handle(new AddProductCommand(UUID.randomUUID(),
                "Product 1",
                10,
                "Some note about the product.",
                null,
                EnumSet.noneOf(ProductFeature.class),
                true));
    }
}
