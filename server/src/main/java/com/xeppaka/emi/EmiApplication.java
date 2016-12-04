package com.xeppaka.emi;

import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.imp.ProductsImporter;
import com.xeppaka.emi.persistence.state.EmiWarehouseRepository;
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
        final EmiWarehouse emiWarehouse = warehouseRepository.find(EmiWarehouse.AGGREGATE_ID);

//        final ProductsImporter pi = new ProductsImporter();
//        pi.doImport(emiWarehouse);
//        warehouseRepository.save(UserName.SYSTEM_USER_NAME.getUserName(), emiWarehouse);
    }
}
