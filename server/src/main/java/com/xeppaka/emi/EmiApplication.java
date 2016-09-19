package com.xeppaka.emi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;

/**
 * Spring Boot application.
 */
@SpringBootApplication
public class EmiApplication {
    public static void main(String[] args) throws IOException {
        final ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(EmiApplication.class, args);
//        new ProductsImporter(configurableApplicationContext.getBean(ProductsJdbcRepository.class))
//                .importProducts(Paths.get("products.json"));
    }
}
