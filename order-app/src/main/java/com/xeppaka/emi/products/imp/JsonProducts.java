package com.xeppaka.emi.products.imp;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by nnm on 9/19/16.
 */
public class JsonProducts {
    @JsonProperty("productsList")
    private List<JsonProduct> productsList;
    @JsonProperty("products_count")
    private int productsCount;

    private JsonProducts() {}

    public List<JsonProduct> getProductsList() {
        return productsList;
    }

    public int getProductsCount() {
        return productsCount;
    }
}
