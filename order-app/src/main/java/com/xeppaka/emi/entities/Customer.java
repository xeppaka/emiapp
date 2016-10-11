package com.xeppaka.emi.entities;

import com.xeppaka.ddd.domain.Entity;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 * Created by nnm on 10/11/16.
 */
public class Customer extends Entity {
    private String name;
    private String email;
    private Country country;

    public Customer(UUID id, String name, Country country, String email) {
        super(id);

        Validate.notNull(name);
        Validate.notNull(country);
        Validate.notNull(email);

        this.name = name;
        this.country = country;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public Country getCountry() {
        return country;
    }

    public String getEmail() {
        return email;
    }
}
