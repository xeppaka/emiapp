package com.xeppaka.emi.controllers;

import com.xeppaka.emi.domain.Country;
import com.xeppaka.emi.dto.UiOrderDto;
import com.xeppaka.emi.dto.UiOrderProductDto;
import com.xeppaka.emi.service.EmiWarehouseException;
import com.xeppaka.emi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity receiveOrder(@RequestBody UiOrderDto orderDto) throws IOException, EmiWarehouseException {
        final Map<UUID, Integer> productsQuantity = new HashMap<>(orderDto.getProducts().size());

        for (UiOrderProductDto orderProduct : orderDto.getProducts()) {
            productsQuantity.put(orderProduct.getProductId(), orderProduct.getQuantity());
        }

        orderService.sendOrder(orderDto.getEmail(), Country.valueOf(orderDto.getCountry()), productsQuantity);

        return ResponseEntity.ok().build();
    }
}
