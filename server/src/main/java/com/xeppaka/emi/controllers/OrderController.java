package com.xeppaka.emi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * Created by Pavel K. on 10/3/16.
 */
@RestController
@RequestMapping("/order")
public class OrderController {
    @RequestMapping(method = RequestMethod.POST)
    public String createOrder() throws MessagingException {
        final Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.yandex.com");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        System.out.println("1");
        final Session session = Session.getDefaultInstance(properties, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("xeptest", "Kleopatra");
            }
        });

        System.out.println("2");
        final MimeMessage mimeMessage = new MimeMessage(session);
        mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress("kachalouski@protonmail.com"));
        mimeMessage.setFrom(new InternetAddress("xeptest@yandex.com"));
        mimeMessage.setSubject("New order");
        mimeMessage.setContent("Some body blah blah", "text/html");

//        System.out.println("3");
//        final Transport transport = session.getTransport("smtp");
//        // transport.connect("smtp.yandex.com", "xeptest", "Kleopatra");
//        System.out.println("before send message");
//        transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
//        System.out.println("after send message");
//        transport.close();

        Transport.send(mimeMessage);

        return "BLA!";
    }
}
