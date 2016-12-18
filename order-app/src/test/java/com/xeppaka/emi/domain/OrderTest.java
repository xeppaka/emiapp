package com.xeppaka.emi.domain;

import com.xeppaka.emi.domain.order.Order;
import com.xeppaka.emi.domain.order.Product;

import org.junit.Ignore;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nnm on 10/4/16.
 */
public class OrderTest {
    @Ignore
    @Test
    public void testOrder() {
        final List<Product> products = new ArrayList<>();

//        products.add(new Product(ProductFeature.MAIN, "Product 1", 50, 1));
//        products.add(new Product(ProductFeature.MAIN, "Product 2", 15, 4));
//        products.add(new Product(ProductFeature.MAIN, "Product 3", 1, 3));
//        products.add(new Product(ProductFeature.MAIN, "Product 4", 180, 8));
//        products.add(new Product(ProductFeature.POS, "Product 5", 5, 12));
//        products.add(new Product(ProductFeature.POS, "Product 6", 320, 2));

        final Order order = new Order("xeppaka@gmail.com", Country.CZ, products);
        System.out.println(order.toHtml());
    }
}
