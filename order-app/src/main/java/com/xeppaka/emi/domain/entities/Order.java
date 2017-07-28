package com.xeppaka.emi.domain.entities;

import com.xeppaka.ddd.domain.BaseEntity;
import com.xeppaka.emi.domain.Country;
import com.xeppaka.emi.domain.value.OrderProduct;
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
import java.util.Base64;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

public class Order extends BaseEntity {
    private static final Logger log = LoggerFactory.getLogger(Order.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
    private static final DateTimeFormatter ATTACHMENT_DATE_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    private final String email;
    private final Country country;
    private final List<OrderProduct> products;
    private final Comparator<OrderProduct> productsComparator;

    public Order(String email, Country country, List<OrderProduct> products) {
        Validate.notEmpty(email);
        Validate.notNull(country);
        Validate.notEmpty(products);

        this.email = email;
        this.country = country;
        this.products = products;
        this.productsComparator = Comparator
                .<OrderProduct>comparingInt(product -> product.isMain() ? 0 : 1)
                .thenComparing(OrderProduct::getCategoryName)
                .thenComparing(OrderProduct::getName);
    }

    public String getCountryString() {
        return country.getCountry();
    }

    public double getTotalWithoutDiscount() {
        return getTotalWithoutDiscount(this.products);
    }

    public double getTotalWithDiscount() {
        return getTotalWithDiscount(this.products);
    }

    private double getTotalWithoutDiscount(Collection<OrderProduct> products) {
        double total = 0;

        for (OrderProduct p : products) {
            total += p.getOriginalPrice() * p.getQuantity();
        }

        return total;
    }

    private double getTotalWithDiscount(Collection<OrderProduct> products) {
        double total = 0;

        for (OrderProduct p : products) {
            total += p.getDiscountPrice() * p.getQuantity();
        }

        return total;
    }

    private List<OrderProduct> getCertificateProducts() {
        return products.stream().filter(OrderProduct::isCertificate).collect(Collectors.toList());
    }

    private List<OrderProduct> getFlammableProducts() {
        return products.stream().filter(OrderProduct::isFlammable).collect(Collectors.toList());
    }

    private List<OrderProduct> getOtherProducts() {
        return products.stream().filter(p -> !p.isFlammable() && !p.isCertificate()).collect(Collectors.toList());
    }

    public void send() {
        try {
            sendWithPostfix();
        } catch (IOException e) {
            log.error("Error occurred while sending order.", e);
        }
    }

    private void sendWithPostfix() throws IOException {
        final String from = "no-reply@emischool.com";
        final String emiEmail = "prague@emischool.com";
//        final String emiEmail = "kachalouski@protonmail.com";
        final String orderCopyEmail = email;

        log.info("Preparing email - from: {}, to E.Mi: {}, to order copy: {}.", from, emiEmail, orderCopyEmail);
        final Path emailPath = prepareEmailBody(from, emiEmail, orderCopyEmail);
        try {
            final Runtime r = Runtime.getRuntime();
            final String[] commands = {
                    "/bin/sh", "-c",
                    MessageFormat.format("cat {0} | sendmail -t -i", emailPath.toString())
            };
            log.info("Sending email with command line: {}.", Arrays.toString(commands));
            final Process p = r.exec(commands);
            int rc = p.waitFor();
            log.info("Send email process return code: {}.", rc);
            if (rc != 0) {
                log.error("action=send_email message=error_send_email rc={}", rc);
                throw new IOException("Error occurred while sending email.");
            }
        } catch (InterruptedException e) {
            log.error("Error while waiting process.");
            Thread.currentThread().interrupt();
        } finally {
            Files.delete(emailPath);
            log.info("Deleted file with email successfully: {}.", emailPath.toString());
        }
    }

    private Path prepareEmailBody(String from, String emiEmail, String orderCopyEmail) throws IOException {
        final String boundary = UUID.randomUUID().toString();
        final String attachmentEmailFileName = MessageFormat.format("order-{0}-{1}.csv", country.toString(), LocalDateTime.now().format(ATTACHMENT_DATE_FORMATTER));
        final Path emailPath = Files
                .createTempFile("e-mail-", ".tmp", PosixFilePermissions.asFileAttribute(PosixFilePermissions.fromString("rw-r--r--")));
        log.info("Created temporary file for e-mail: {}", emailPath.toString());

        try (final BufferedWriter os = new BufferedWriter(new FileWriter(emailPath.toFile()))) {
            os.write(MessageFormat.format("From: E.Mi International <{0}>", from));
            os.newLine();
            os.write(MessageFormat.format("To: E.Mi International <{0}>", emiEmail));
            os.newLine();
            os.write(MessageFormat.format("CC: Order Copy <{0}>", orderCopyEmail));
            os.newLine();
            os.write(MessageFormat.format("Subject: New order from {0}.", country.getCountry()));
            os.newLine();
            os.write("MIME-Version: 1.0");
            os.newLine();
            os.write(MessageFormat.format("Content-Type: multipart/mixed; boundary={0}", boundary));
            os.newLine();
            os.newLine();
            os.write(MessageFormat.format("--{0}", boundary));
            os.newLine();
            os.write("Content-Type: text/html; charset=UTF-8");
            os.newLine();
            os.write("Content-Transfer-Encoding: base64");
            os.newLine();
            os.newLine();
            os.write(Base64.getEncoder().encodeToString(toHtml().getBytes("UTF-8")));
            os.newLine();
            os.write(MessageFormat.format("--{0}", boundary));
            os.newLine();
            os.write(MessageFormat.format("Content-Type: text/csv; name={0}", attachmentEmailFileName));
            os.newLine();
            os.write("Content-Transfer-Encoding: base64");
            os.newLine();
            os.write(MessageFormat.format("Content-Disposition: attachment; filename={0}", attachmentEmailFileName));
            os.newLine();
            os.newLine();
            os.write(Base64.getEncoder().encodeToString(toCsv(products).getBytes("UTF-8")));
            os.newLine();
            os.write(MessageFormat.format("--{0}--", boundary));
        }

        return emailPath;
    }

    public String toHtml() {
        final String htmlBegin = "<html>\n<head></head>\n<body>\n";
        final String htmlEnd = "</html>";
        final String country = MessageFormat.format("<div>Order country: {0}</div>\n", getCountryString());
        final String date = MessageFormat.format("<div>Order date: {0} (UTC)</div>\n", LocalDateTime.now().format(FORMATTER));
        final String space = "<div><br/></div>\n";
        final String orderTotal = orderTotal();

        final List<OrderProduct> certificateProducts = getCertificateProducts();
        final List<OrderProduct> flammableProducts = getFlammableProducts();
        final List<OrderProduct> otherProducts = getOtherProducts();

        final Optional<String> certificateProductsTable = certificateProducts.isEmpty() ? Optional.empty() : Optional.of(productsToHtmlTable(certificateProducts));
        final Optional<String> flammableProductsTable = flammableProducts.isEmpty() ? Optional.empty() : Optional.of(productsToHtmlTable(flammableProducts));
        final Optional<String> otherProductsTable = otherProducts.isEmpty() ? Optional.empty() : Optional.of(productsToHtmlTable(otherProducts));

        final StringBuilder resultEmail = new StringBuilder(htmlBegin);
        resultEmail.append(country).append(date).append(space);

        final int tablesCount = certificateProductsTable.map(s -> 1).orElse(0) +
                flammableProductsTable.map(s -> 1).orElse(0) +
                otherProductsTable.map(s -> 1).orElse(0);

        certificateProductsTable.ifPresent(s -> resultEmail.append(tableName("Certificates")).append(s).append(space));
        flammableProductsTable.ifPresent(s -> resultEmail.append(tableName("Flammable products")).append(s).append(space));
        otherProductsTable.ifPresent(s -> {
            if (tablesCount > 1) {
                resultEmail.append(tableName("Other products"));
            }
            resultEmail.append(s).append(space);
        });

        resultEmail.append(space).append(orderTotal).append(htmlEnd);

        return resultEmail.toString();
    }

    private String tableName(String name) {
        return MessageFormat.format("<p>{0}:</p>", name);
    }

    private String productsToHtmlTable(Collection<OrderProduct> products) {
        final List<OrderProduct> sortedProducts = new ArrayList<>(products);
        sortedProducts.sort(productsComparator);
        final StringBuilder tableRows = new StringBuilder();
        int idx = 0;
        for (OrderProduct product : sortedProducts) {
            tableRows.append(productToHtml(++idx, product));
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
                "<td colspan=\"7\" style=\"text-align: right; border-bottom: 1px solid black; border-left: 1px solid black;\">Total without discount: {1,number,#.###}&#8364;&nbsp;&nbsp;&nbsp;Total with discount: {2,number,#.###}&#8364;</td>" +
                "</tr>\n" +
                "</tfoot>\n" +
                "<tbody>\n" +
                "{0}\n" +
                "</tbody>\n" +
                "</table>\n", tableRows.toString(), getTotalWithoutDiscount(products), getTotalWithDiscount(products));

        return table;
    }

    private String productToHtml(int idx, OrderProduct product) {
        return MessageFormat.format("<tr>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{0}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{1}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{2,number,#.###}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{3,number,#.###}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{4,number,#}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{5,number,#.###}</td>" +
                        "<td style=\"border-bottom: 1px solid black; border-left: 1px solid black;\">{6,number,#.###}</td>" +
                        "</tr>\n",
                idx,
                product.getName(),
                product.getOriginalPrice(), product.getDiscountPrice(),
                product.getQuantity(),
                product.getOriginalTotal(), product.getDiscountTotal()
        );
    }

    private String orderTotal() {
        return MessageFormat.format("<span style=\"font-size: 100%;\">Order total without discount: {0}&#8364;.&nbsp;&nbsp;&nbsp;</span><span style=\"font-size: 120%;\">Order total with discount:&nbsp;</span><span style=\"font-weight: bold; font-size: 120%;\">{1}&#8364;.</span>", getTotalWithoutDiscount(), getTotalWithDiscount());
    }

    private String toCsv(Collection<OrderProduct> products) {
        final List<OrderProduct> sortedProducts = new ArrayList<>(products);
        sortedProducts.sort(productsComparator);
        final StringBuilder csvRows = new StringBuilder();
        csvRows.append("#:Product Name:Retail price (without VAT, in €):Discount price (without VAT, in €):Quantity:Retail price x Quantity (without discount, without VAT in €):Retail price x Quantity (with discount, without VAT in €)");
        csvRows.append("\r\n");

        int idx = 0;
        for (OrderProduct product : sortedProducts) {
            csvRows.append(productToCsv(++idx, product));
            csvRows.append("\r\n");
        }

        return csvRows.toString();
    }

    private String productToCsv(int idx, OrderProduct product) {
        return MessageFormat.format(
                "{0}:{1}:{2,number,#.###}:{3,number,#.###}:{4,number,#}:{5,number,#.###}:{6,number,#.###}",
                idx,
                product.getName(),
                product.getOriginalPrice(),
                product.getDiscountPrice(),
                product.getQuantity(),
                product.getOriginalTotal(),
                product.getDiscountTotal()
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Order order = (Order) o;

        if (!email.equals(order.email)) return false;
        if (country != order.country) return false;
        return products.equals(order.products);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + email.hashCode();
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
