package com.xeppaka.emi.imp;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by nnm on 9/19/16.
 */
public class JsonProducts {
    private List<JsonProduct> productsList;

    private JsonProducts() {}

    public List<JsonProduct> getProductsList() {
        return productsList;
    }
}
