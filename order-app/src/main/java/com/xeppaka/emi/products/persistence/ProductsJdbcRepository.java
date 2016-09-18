package com.xeppaka.emi.products.persistence;

import com.xeppaka.ddd.persistence.CrudRepository;
import com.xeppaka.emi.products.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Created by Pavel K. on 9/17/16.
 */
@Repository
public class ProductsJdbcRepository implements CrudRepository<String, Product> {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public <T extends Product> T save(T product) {
        jdbcTemplate.update("INSERT INTO products (id, name, price) VALUES (?, ?, ?)", product.getId(), product.getName(), product.getPrice());
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
