package com.xeppaka.emi.domain.value;

import com.xeppaka.emi.domain.Country;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermissions;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

public class Order {
    private static final Logger log = LoggerFactory.getLogger(Order.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

    private final String email;
    private final Country country;
    private final Map<ProductDto, Integer> productsQuantity;
    private final Set<UUID> posCategories;
    private final Comparator<Map.Entry<ProductDto, Integer>> productDtoComparator;

    public Order(String email, Country country, Map<ProductDto, Integer> productsQuantity, Set<UUID> posCategories) {
        Validate.notEmpty(email);
        Validate.notNull(country);
        Validate.notEmpty(productsQuantity);
        Validate.notNull(posCategories);

        this.email = email;
        this.country = country;
        this.productsQuantity = productsQuantity;
        this.posCategories = posCategories;
        this.productDtoComparator = Comparator
                .<Map.Entry<ProductDto, Integer>>comparingInt(p -> posCategories.contains(p.getKey().getCategoryId()) ? 1 : 0)
                .thenComparing(p -> p.getKey().getName());
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
                total += p.getKey().getPrice() / 100d * p.getValue();
            }
        }

        return total;
    }

    public double getTotalWithDiscount() {
        double total = 0;

        for (Map.Entry<ProductDto, Integer> p : productsQuantity.entrySet()) {
            if (!posCategories.contains(p.getKey().getCategoryId())) {
                total += p.getKey().getPrice() / 200d * p.getValue();
            }
        }

        return total;
    }

    public void send() throws IOException {
        sendWithPostfix();
    }

    private void sendWithPostfix() throws IOException {
        final Path emailPath = prepareEmailBody();
        try {
            final Runtime r = Runtime.getRuntime();
            final String[] commands = {"/bin/sh", "-c", MessageFormat.format("cat {0} | sendmail -t -i", emailPath.toString())};
            log.info("Sending email with command line: {}.", Arrays.toString(commands));
            final Process p = r.exec(commands);
            int rc = p.waitFor();
            log.info("Send email process return code: {}.", rc);
        } catch (InterruptedException e) {
            log.error("Error while waiting process.");
            Thread.currentThread().interrupt();
        } finally {
            //Files.delete(emailPath);
            log.info("Deleted file with email successfully: {}.", emailPath.toString());
        }
    }

    private Path prepareEmailBody() throws IOException {
        final Path emailPath = Files
                .createTempFile("e-mail-", ".tmp", PosixFilePermissions.asFileAttribute(PosixFilePermissions.fromString("rw-r--r--")));
        log.info("Created temporary file for e-mail: {}", emailPath.toString());

        try (final BufferedWriter os = new BufferedWriter(new FileWriter(emailPath.toFile()))) {
            os.write("To: E.Mi International <kachalouski@protonmail.com>");
            os.newLine();
            os.write(MessageFormat.format("CC: Customer <{0}>", this.email));
            os.newLine();
            os.write("From: E.Mi International <no-reply@emischool.com>");
            os.newLine();
            os.write(MessageFormat.format("Subject: New order from {0}.", this.country.getCountry()));
            os.newLine();
            os.write("Content-Type: text/html; charset=UTF-8");
            os.newLine();
            os.write(toHtml());
            os.newLine();
        }

        return emailPath;
    }

    public String toHtml() {
        final String htmlBegin = "<html>\n<head></head>\n<body>\n";
        final String htmlEnd = "</html>\n";
        final String country = MessageFormat.format("<div>Order country: {0}</div>\n", getCountryString());
        final String date = MessageFormat.format("<div>Order date: {0}</div>\n", LocalDateTime.now().format(FORMATTER));
        final String space = "<div><br/></div>\n";

        final List<Map.Entry<ProductDto, Integer>> sortedProducts = new ArrayList<>(productsQuantity.entrySet());
        sortedProducts.sort(productDtoComparator);
        final StringBuilder tableRows = new StringBuilder();
        int idx = 0;
        for (Map.Entry<ProductDto, Integer> e : sortedProducts) {
            final ProductDto product = e.getKey();
            final int quantity = e.getValue();
            tableRows.append(productToHtml(++idx, product, quantity, !posCategories.contains(product.getCategoryId())));
        }

        final String table = MessageFormat.format("<table style=\"width:100%; border-spacing: 0px; border-top: 1px solid black; border-right: 1px solid black;\">\n<thead>\n" +
                "<tr>\n" +
                "<th style=\"width:2%; border-bottom: 1px solid black; border-left: 1px solid black;\">#</th>\n" +
                "<th style=\"width:38%; border-bottom: 1px solid black; border-left: 1px solid black;\">Product Name</th>\n" +
                "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Retail price (without VAT, in &#8364;)</th>\n" +
                "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Discount price (without VAT, in &#8364;)</th>\n" +
                "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Quantity</th>\n" +
                "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Retail price x Quantity (without discount, without VAT in &#8364;)</th>\n" +
                "<th style=\"width:12%; border-bottom: 1px solid black; border-left: 1px solid black;\">Retail price x Quantity (with discount, without VAT in &#8364;)</th>\n" +
                "</tr>\n" +
                "</thead>\n" +
                "<tfoot>\n" +
                "<tr>" +
                "<td colspan=\"7\" style=\"text-align: right; border-bottom: 1px solid black; border-left: 1px solid black;\">Total without discount: {1,number,#.##}&#8364;&nbsp;&nbsp;&nbsp;Total with discount: {2,number,#.##}&#8364;</td>" +
                "</tr>\n" +
                "</tfoot>\n" +
                "<tbody>\n" +
                "{0}\n" +
                "</tbody>\n" +
                "</table>\n", tableRows.toString(), getTotal(), getTotalWithDiscount());

        return htmlBegin + country + date + space + table + htmlEnd;
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
                        "</tr>\n",
                idx, product.getName(), product.getPrice() / 100d, isMain ? (product.getPrice() / 200d) : 0, quantity,
                product.getPrice() / 100d * quantity,
                isMain ? (product.getPrice() / 200d * quantity) : 0);
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
