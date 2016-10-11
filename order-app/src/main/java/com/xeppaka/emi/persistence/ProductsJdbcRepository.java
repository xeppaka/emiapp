package com.xeppaka.emi.persistence;

import com.xeppaka.ddd.persistence.Repository;
import com.xeppaka.emi.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Created by Pavel K. on 9/17/16.
 */
@org.springframework.stereotype.Repository
public class ProductsJdbcRepository implements Repository<String, Product> {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public <T extends Product> T save(T product) {
        jdbcTemplate.update("INSERT INTO PRODUCTS (ID, NAME, PRICE, NOTE, ) VALUES (?, ?, ?)", product.getId(), product.getName(), product.getPrice());
        return product;
    }

    @Override
    public <T extends Product> T find(String s) {
        return null;
    }

    @Override
    public void delete(String s) {

    }

    @Override
    public void delete() {

    }
}
