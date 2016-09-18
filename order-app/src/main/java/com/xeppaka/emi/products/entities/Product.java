package com.xeppaka.emi.products.entities;

import com.xeppaka.ddd.domain.Entity;
import org.apache.commons.lang3.Validate;

/**
 * Created by Pavel K. on 9/17/16.
 */
public class Product extends Entity {
    private String name;
    private double price;

    public Product(String name, double price) {
        Validate.notEmpty(name);
        Validate.notNull(name);
        Validate.notNull(price);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);

        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Product product = (Product) o;

        if (Double.compare(product.price, price) != 0) return false;
        return name.equals(product.name);

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        long temp;
        result = 31 * result + name.hashCode();
        temp = Double.doubleToLongBits(price);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + getId() + '\'' +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
