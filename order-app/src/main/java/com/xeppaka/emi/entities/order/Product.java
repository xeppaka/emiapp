package com.xeppaka.emi.entities.order;

import com.xeppaka.ddd.domain.Entity;
import com.xeppaka.emi.entities.ProductFeature;
import org.apache.commons.lang3.Validate;

/**
 * Created by Pavel K. on 9/17/16.
 */
public class Product extends Entity {
    private ProductFeature type;
    private String name;
    private double price;
    private int quantity;

    public Product(ProductFeature type, String name, double price, int quantity) {
        Validate.notNull(type);
        Validate.notEmpty(name);
        Validate.notNull(name);
        Validate.notNull(price);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);
        Validate.inclusiveBetween(1, Integer.MAX_VALUE, quantity);

        this.type = type;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public ProductFeature getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Product product = (Product) o;

        if (Double.compare(product.price, price) != 0) return false;
        if (quantity != product.quantity) return false;
        return name.equals(product.name);

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        long temp;
        result = 31 * result + name.hashCode();
        temp = Double.doubleToLongBits(price);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + quantity;
        return result;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + getId() + '\'' +
                "type='" + type + '\'' +
                "name='" + name + '\'' +
                ", price=" + price + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
