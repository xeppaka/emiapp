package com.xeppaka.emi.domain.value;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.Validate;

import com.xeppaka.emi.domain.Country;
import com.xeppaka.emi.persistence.view.dto.ProductDto;

public class Order {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

    private final String email;
    private final Country country;
    private final Map<ProductDto, Integer> productsQuantity;
    private final Set<UUID> posCategories;

    public Order(String email, Country country, Map<ProductDto, Integer> productsQuantity, Set<UUID> posCategories) {
        Validate.notEmpty(email);
        Validate.notNull(country);
        Validate.notEmpty(productsQuantity);
        Validate.notNull(posCategories);

        this.email = email;
        this.country = country;
        this.productsQuantity = productsQuantity;
        this.posCategories = posCategories;
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

    public Map<ProductDto, Integer> getProductsQuantity() {
        return productsQuantity;
    }

    public Set<UUID> getPosCategories() {
        return posCategories;
    }

    public double getTotal() {
        double total = 0;

        for (Map.Entry<ProductDto, Integer> p : productsQuantity.entrySet()) {
            if (!posCategories.contains(p.getKey().getCategoryId())) {
                total += p.getKey().getPrice() / 100f * p.getValue();
            }
        }

        return total;
    }

    public double getTotalWithDiscount() {
        double total = 0;

        for (Map.Entry<ProductDto, Integer> p : productsQuantity.entrySet()) {
            if (!posCategories.contains(p.getKey().getCategoryId())) {
                total += p.getKey().getPrice() / 200f * p.getValue();
            }
        }

        return total;
    }

    public void send() throws MessagingException {
        sendToEmails(new InternetAddress("kachalouski@protonmail.com"), new InternetAddress(getEmail()));
    }

    private void sendToEmails(InternetAddress... emails) throws MessagingException {
        Validate.isTrue(emails.length > 0);

        final Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.yandex.com");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        final Session session = Session.getDefaultInstance(properties, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("xeptest", "Kleopatra");
            }
        });

        final MimeMessage mimeMessage = new MimeMessage(session);
        // mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(""));
        mimeMessage.addRecipient(Message.RecipientType.TO, emails[0]);
        for (int i = 1; i < emails.length; ++i) {
            mimeMessage.addRecipient(Message.RecipientType.CC, emails[i]);
        }

        mimeMessage.setFrom(new InternetAddress("xeptest@yandex.com"));
        mimeMessage.setSubject(MessageFormat.format("New Order from {0}.", getCountryString()));
        mimeMessage.setContent(toHtml(), "text/html; charset=\"UTF-8\"");

        Transport.send(mimeMessage);
    }

    public String toHtml() {
        final String country = MessageFormat.format("<div>Order country: {0}</div>", getCountryString());
        final String date = MessageFormat.format("<div>Order date: {0}</div>", LocalDateTime.now().format(FORMATTER));
        final String space = "<div><br /></div>";

        final List<Map.Entry<ProductDto, Integer>> sortedProducts = new ArrayList<>(productsQuantity.entrySet());
        sortedProducts.sort(Comparator.comparing(e2 -> e2.getKey().getName()));
        final StringBuilder tableRows = new StringBuilder();
        int idx = 0;
        for (Map.Entry<ProductDto, Integer> e : sortedProducts) {
            final ProductDto product = e.getKey();
            final int quantity = e.getValue();
            tableRows.append(productToHtml(++idx, product, quantity, !posCategories.contains(product.getCategoryId())));
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

    private String productToHtml(int idx, ProductDto product, int quantity, boolean isMain) {
        return MessageFormat.format("<tr>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{0}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{1}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{2,number,#.##}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{3,number,#.##}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{4,number,#}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{5,number,#.##}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{6,number,#.##}</td>" +
                        "</tr>",
                idx, product.getName(), product.getPrice() / 100f, isMain ? (product.getPrice() / 200f) : 0, quantity,
                product.getPrice() / 100f * quantity,
                isMain ? (product.getPrice() / 200f * quantity) : 0);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Order order = (Order) o;

        if (!email.equals(order.email)) return false;
        if (country != order.country) return false;
        return productsQuantity.equals(order.productsQuantity);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + email.hashCode();
        result = 31 * result + country.hashCode();
        result = 31 * result + productsQuantity.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Order{" +
                "email='" + email + '\'' +
                ", country=" + country +
                ", productsQuantity=" + productsQuantity +
                '}';
    }
}
