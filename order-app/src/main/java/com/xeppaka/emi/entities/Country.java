package com.xeppaka.emi.entities;

/**
 * Created by nnm on 10/4/16.
 */
public enum Country {
    CZ("Czech Republic"),
    IT("Italy"),
    SP("Spain"),
    IR("Ireland"),
    FI("Finland");

    private final String country;

    Country(String country) {
        this.country = country;
    }

    public String getCountry() {
        return country;
    }
}
