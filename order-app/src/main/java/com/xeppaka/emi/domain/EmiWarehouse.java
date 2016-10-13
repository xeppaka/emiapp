package com.xeppaka.emi.domain;

import com.xeppaka.ddd.domain.BaseAggregate;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.emi.domain.entities.Product;
import com.xeppaka.emi.events.ProductAdded;
import com.xeppaka.emi.events.EmiEvent;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by Pavel K. on 10/11/16.
 */
public class EmiWarehouse extends BaseAggregate {
    private Map<UUID, Product> productsMap = new HashMap<>();

    @Override
    public <E extends Event> void apply(E event) {
        final EmiEvent emiEvent = (EmiEvent) event;

        switch (emiEvent.getType()) {
            case PRODUCT_ADDED: {
                final ProductAdded addProductEvent = (ProductAdded) emiEvent;

            }
        }
    }

    public void addProduct(String name, double price) {
        addEvent(new ProductAdded(name, price));
    }
}
