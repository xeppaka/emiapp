package com.xeppaka.emi;

import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.persistence.EmiWarehouseRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;

/**
 * Spring Boot application.
 */
@SpringBootApplication
public class EmiApplication {
    public static void main(String[] args) throws IOException, RepositoryException {
        final ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(EmiApplication.class, args);
        final EmiWarehouseRepository warehouseRepository = configurableApplicationContext.getBean(EmiWarehouseRepository.class);
        final EmiWarehouse emiWarehouse = new EmiWarehouse();
        emiWarehouse.addProduct("Product 1", 10);
        emiWarehouse.addProduct("Product 2", 11);
        emiWarehouse.addProduct("Product 3", 14);
        emiWarehouse.addProduct("Product 4", 20);

        warehouseRepository.save(emiWarehouse);
    }
}
