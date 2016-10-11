package com.xeppaka.emi.entities;

import org.apache.commons.lang3.Validate;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;

/**
 * Created by nnm on 10/4/16.
 */
public class Order {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

    private final String email;
    private final Country country;
    private final Collection<Product> products;

    public Order(String email, Country country, Collection<Product> products) {
        Validate.notEmpty(email);
        Validate.notNull(country);
        Validate.notEmpty(products);

        this.email = email;
        this.country = country;
        this.products = products;
    }

    public String getEmail() {
        return email;
    }

    public Country getCountry() {
        return country;
    }

    public String getCountryString() {
        return country.getCountry();
    }

    public Collection<Product> getProducts() {
        return products;
    }

    public String toHtml() {
        final String country = MessageFormat.format("<div>Order country: {0}</div>", getCountryString());
        final String date = MessageFormat.format("<div>Order date: {0}</div>", LocalDateTime.now().format(FORMATTER));
        final String space = "<div><br /></div>";

        final StringBuilder tableRows = new StringBuilder();
        int idx = 0;
        for (Product p : products) {
            tableRows.append(productToHtml(++idx, p));
        }

        final String table = MessageFormat.format("<table style=\"width:100%; border-spacing: 0px; border-top: 1px solid black; border-right: 1px solid black;\"><thead>" +
                             "<tr>" +
                             "<th style=\"width:2%; border-bottom: 1px solid black; border-left: 1px solid black;\">#</th>" +
                             "<th style=\"width:38%; border-bottom: 1px solid black; border-left: 1px solid black;\">Product Name</th>" +
                             "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Retail price (without VAT, in &#8364;)</th>" +
                             "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Discount price (without VAT, in &#8364;)</th>" +
                             "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Quantity</th>" +
                             "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Retail price x Quantity (without discount, without VAT in &#8364;)</th>" +
                             "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Retail price x Quantity (with discount, without VAT in &#8364;)</th>" +
                             "</tr>" +
                             "</thead>" +
                             "<tfoot>" +
                             "<tr>" +
                             "<td colspan=\"7\" style=\"text-align: right; border-bottom: 1px solid black; border-left: 1px solid black;\">Total without discount: {1,number,#.##}&#8364;&nbsp;&nbsp;&nbsp;Total with discount: {2,number,#.##}&#8364;</td>" +
                             "</tr>" +
                             "</tfoot>" +
                             "<tbody>" +
                             "{0}" +
                             "</tbody>" +
                             "</table>", tableRows.toString(), getTotal(), getTotalWithDiscount());

        return country + date + space + table;
    }

    private String productToHtml(int idx, Product product) {
        return MessageFormat.format("<tr>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{0}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{1}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{2}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{3,number,#.##}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{4}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{5,number,#.##}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{6,number,#.##}</td>" +
                        "</tr>",
                idx, product.getName(), product.getPrice(), product.getPrice() / 2, product.getQuantity(),
                product.getPrice() * product.getQuantity(),
                product.getPrice() / 2 * product.getQuantity());
    }

    public double getTotal() {
        double total = 0;

        for (Product p : products) {
            total += p.getPrice() * p.getQuantity();
        }

        return total;
    }

    public double getTotalWithDiscount() {
        double total = 0;

        for (Product p : products) {
            if (p.getType() == ProductType.MAIN) {
                total += p.getPrice() / 2 * p.getQuantity();
            }
        }

        return total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Order order = (Order) o;

        if (!email.equals(order.email)) return false;
        if (country != order.country) return false;
        return products.equals(order.products);

    }

    @Override
    public int hashCode() {
        int result = email.hashCode();
        result = 31 * result + country.hashCode();
        result = 31 * result + products.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Order{" +
                "email='" + email + '\'' +
                ", country=" + country +
                ", products=" + products +
                '}';
    }
}
