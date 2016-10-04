package com.xeppaka.emi.entities;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nnm on 10/4/16.
 */
public class OrderTest {
    @Test
    public void testOrder() {
        final List<Product> products = new ArrayList<>();

        products.add(new Product("Product 1", 0.5, 1));
        products.add(new Product("Product 2", 0.15, 4));
        products.add(new Product("Product 3", 1, 3));
        products.add(new Product("Product 4", 1.8, 8));
        products.add(new Product("Product 5", 5, 12));
        products.add(new Product("Product 6", 3.2, 2));

        final Order order = new Order("xeppaka@gmail.com", Country.CZ, products);
        System.out.println(order.toHtml());
    }
}
