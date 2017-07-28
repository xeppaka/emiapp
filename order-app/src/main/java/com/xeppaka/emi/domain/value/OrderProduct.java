/*
 * Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
 */
package com.xeppaka.emi.domain.value;

import java.util.UUID;

/**
 * TODO: document it!
 */
public class OrderProduct {
    private final UUID productId;
    private final String name;
    private final int price;
    private final String categoryName;
    private final int quantity;
    private final boolean isMain;
    private final boolean isCertificate;
    private final boolean isFlammable;

    public OrderProduct(UUID productId, String name, int price, String categoryName,
                        int quantity, boolean isMain, boolean isCertificate, boolean isFlammable) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.categoryName = categoryName;
        this.quantity = quantity;
        this.isMain = isMain;
        this.isCertificate = isCertificate;
        this.isFlammable = isFlammable;
    }

    public UUID getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public double getOriginalPrice() {
        return getPrice() / 100d;
    }

    public double getDiscountPrice() {
        if (!isMain()) {
            return 0;
        }

        if (isCertificate()) {
            return getOriginalPrice();
        }

        return getOriginalPrice() / 2d;
    }

    public double getOriginalTotal() {
        return getOriginalPrice() * getQuantity();
    }

    public double getDiscountTotal() {
        return getDiscountPrice() * getQuantity();
    }

    public String getCategoryName() {
        return categoryName;
    }

    public int getQuantity() {
        return quantity;
    }

    public boolean isMain() {
        return isMain;
    }

    public boolean isCertificate() {
        return isCertificate;
    }

    public boolean isFlammable() {
        return isFlammable;
    }
}
