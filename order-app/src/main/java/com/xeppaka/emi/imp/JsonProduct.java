package com.xeppaka.emi.imp;

/**
 * Created by nnm on 9/19/16.
 */
public class JsonProduct {
    private String name;
    private double price;
    private int multiplicity;
    private String type;
    private String category;
    private String note;

    private JsonProduct() {}

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getMultiplicity() {
        return multiplicity;
    }

    public String getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }

    public String getNote() {
        return note;
    }

    @Override
    public String toString() {
        return "JsonProduct{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", multiplicity=" + multiplicity +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
