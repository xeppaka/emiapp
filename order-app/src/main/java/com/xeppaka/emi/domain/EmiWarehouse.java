package com.xeppaka.emi.domain;

import com.xeppaka.ddd.domain.BaseAggregate;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.emi.events.AddProductEvent;

/**
 * Created by Pavel K. on 10/11/16.
 */
public class EmiWarehouse extends BaseAggregate {
    @Override
    public <E extends Event> void apply(E event) {

    }

    public void addProduct(String name, double price) {
        addEvent(new AddProductEvent(name, price));
    }
}
