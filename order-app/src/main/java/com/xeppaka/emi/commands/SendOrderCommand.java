package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;
import com.xeppaka.emi.domain.Country;
import org.apache.commons.lang3.Validate;

import java.util.Map;
import java.util.UUID;

/**
 *
 */
public class SendOrderCommand implements Command {
    private final String email;
    private final Country country;
    private final Map<UUID, Integer> productsQuantity;

    public SendOrderCommand(String email, Country country, Map<UUID, Integer> productsQuantity) {
        Validate.notNull(email);
        Validate.notNull(country);

        this.email = email;
        this.country = country;
        this.productsQuantity = productsQuantity;
    }

    public String getEmail() {
        return email;
    }

    public Country getCountry() {
        return country;
    }

    public Map<UUID, Integer> getProductsQuantity() {
        return productsQuantity;
    }
}
