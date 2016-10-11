package com.xeppaka.emi.service;

import com.xeppaka.emi.entities.order.Order;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.text.MessageFormat;
import java.util.Properties;

/**
 *
 */
@Service
public class OrderService {
    public void createOrder(Order order) throws MessagingException {
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
        mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress("kachalouski@protonmail.com"));
        mimeMessage.addRecipient(Message.RecipientType.CC, new InternetAddress(order.getEmail()));
        mimeMessage.setFrom(new InternetAddress("xeptest@yandex.com"));
        mimeMessage.setSubject(MessageFormat.format("New Order from {0}.", order.getCountryString()));
        mimeMessage.setContent(order.toHtml(), "text/html");

        Transport.send(mimeMessage);
    }
}
