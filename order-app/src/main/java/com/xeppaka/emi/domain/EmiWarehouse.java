package com.xeppaka.emi.domain;

import com.xeppaka.ddd.domain.Aggregate;
import com.xeppaka.ddd.events.Event;

/**
 * Created by Pavel K. on 10/11/16.
 */
public class EmiWarehouse implements Aggregate {


    @Override
    public <E extends Event> void apply(E event) {
    }
}
