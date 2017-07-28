/*
 * Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
 */
package com.xeppaka.emi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.xeppaka.emi.persistence.view.dto.ProductDto;

/**
 * UI representation of the product, how it is sent to UI.
 */
public class UiProductDto {
    @JsonUnwrapped
    private final ProductDto product;
    private final boolean isMain;
    private final boolean isCertificate;

    public UiProductDto(ProductDto product, boolean isMain, boolean isCertificate) {
        this.product = product;
        this.isMain = isMain;
        this.isCertificate = isCertificate;
    }

    public ProductDto getProduct() {
        return product;
    }

    @JsonProperty("isMain")
    public boolean isMain() {
        return isMain;
    }

    @JsonProperty("isCertificate")
    public boolean isCertificate() {
        return isCertificate;
    }
}
