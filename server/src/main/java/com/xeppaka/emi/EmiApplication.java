package com.xeppaka.emi;

import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.persistence.state.EmiWarehouseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;
import java.util.UUID;

/**
 * Spring Boot application.
 */
@SpringBootApplication
public class EmiApplication {
    private static final Logger log = LoggerFactory.getLogger(EmiApplication.class);

    public static void main(String[] args) throws IOException, RepositoryException {
        final ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(EmiApplication.class, args);
        final EmiWarehouseRepository warehouseRepository = configurableApplicationContext.getBean(EmiWarehouseRepository.class);

        final UUID aggregateId = EmiWarehouse.AGGREGATE_ID;
        log.info("Reading EmiWarehouse aggregate into memory. ID = {}", aggregateId);
        final EmiWarehouse emiWarehouse = warehouseRepository.find(aggregateId);
        log.info("Finished.");
        log.info(emiWarehouse.summary());

//        final ProductsImporter pi = new ProductsImporter();
//        pi.doImport(emiWarehouse);
//        warehouseRepository.save(UserName.SYSTEM_USER_NAME.getUserName(), emiWarehouse);
    }
}
