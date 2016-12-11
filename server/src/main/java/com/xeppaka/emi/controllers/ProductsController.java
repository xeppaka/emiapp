package com.xeppaka.emi.controllers;

import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import com.xeppaka.emi.service.EmiWarehouseException;
import com.xeppaka.emi.service.ProductsService;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    @RequestMapping(method = RequestMethod.GET)
    public List<ProductDto> getProducts() {
        return productsService.getProducts();
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public List<ProductDto> updateProducts(@RequestBody Collection<ProductDto> products) throws EmiWarehouseException {
        Validate.notNull(products);
        Validate.notEmpty(products);

        return productsService.updateProducts(UserName.SYSTEM_USER_NAME, products);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ProductDto createProduct(@RequestBody ProductDto product) throws EmiWarehouseException {
        Validate.notNull(product);

        return productsService.createProduct(UserName.SYSTEM_USER_NAME,
                product.getName(),
                product.getPrice(),
                product.getMultiplicity(),
                product.getNote(),
                product.getCategoryId(),
                product.getFeatures(),
                product.getWeight());
    }
}
