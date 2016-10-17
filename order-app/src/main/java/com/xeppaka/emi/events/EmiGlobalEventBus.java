package com.xeppaka.emi.events;

import com.xeppaka.ddd.events.BaseEventBus;
import com.xeppaka.emi.persistence.CategoriesRepository;
import com.xeppaka.emi.persistence.EmiEventPersistenceListener;
import com.xeppaka.emi.persistence.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Created by nnm on 10/17/16.
 */
@Component
public class EmiGlobalEventBus extends BaseEventBus {
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private CategoriesRepository categoriesRepository;

    @PostConstruct
    void init() {
        addListener(new EmiEventPersistenceListener(productsRepository, categoriesRepository));
    }
}
