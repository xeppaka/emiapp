/*
 * Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
 */
package com.xeppaka.emi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;

/**
 * TODO: document it!
 */
public class UiCategoryDto {
    @JsonUnwrapped
    private final CategoryDto categoryDto;
    private final boolean isMain;
    private final boolean isCertificate;

    public UiCategoryDto(CategoryDto categoryDto, boolean isMain, boolean isCertificate) {
        this.categoryDto = categoryDto;
        this.isMain = isMain;
        this.isCertificate = isCertificate;
    }

    public CategoryDto getCategoryDto() {
        return categoryDto;
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
