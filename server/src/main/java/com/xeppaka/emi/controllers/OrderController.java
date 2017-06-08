package com.xeppaka.emi.controllers;

import com.xeppaka.emi.domain.Country;
import com.xeppaka.emi.domain.value.Order;
import com.xeppaka.emi.dto.OrderDto;
import com.xeppaka.emi.dto.OrderProductDto;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import com.xeppaka.emi.service.CategoriesService;
import com.xeppaka.emi.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final ProductsService productsService;
    private final CategoriesService categoriesService;

    @Autowired
    public OrderController(ProductsService productsService, CategoriesService categoriesService) {
        this.productsService = productsService;
        this.categoriesService = categoriesService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity sendOrder(@RequestBody OrderDto orderDto) throws IOException {
        final String email = orderDto.getEmail();
        final String country = orderDto.getCountry();
        final Map<ProductDto, Integer> productsQuantity = new HashMap<>(orderDto.getProducts().size());
        final Set<UUID> posCategories = new HashSet<>();

        for (OrderProductDto orderProduct : orderDto.getProducts()) {
            final ProductDto productDto = productsService.getProduct(orderProduct.getProductId());

            if (categoriesService.isCategoryUnderPos(productDto.getCategoryId())) {
                posCategories.add(productDto.getCategoryId());
            }

            productsQuantity.put(productDto, orderProduct.getQuantity());
        }

        new Order(email, Country.valueOf(country), productsQuantity, posCategories).send();

        return ResponseEntity.ok().build();
    }
}
