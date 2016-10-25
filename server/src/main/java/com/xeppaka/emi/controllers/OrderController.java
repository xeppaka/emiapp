package com.xeppaka.emi.controllers;

import com.xeppaka.emi.dto.OrderDto;
import com.xeppaka.emi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

/**
 * Created by Pavel K. on 10/3/16.
 */
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @RequestMapping(method = RequestMethod.POST)
    public void createOrder(@RequestBody OrderDto order) throws MessagingException {
        // orderService.createOrder(order.toOrder());
    }
}
