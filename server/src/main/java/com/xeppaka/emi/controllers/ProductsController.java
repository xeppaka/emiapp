package com.xeppaka.emi.controllers;

import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import com.xeppaka.emi.service.EmiWarehouseException;
import com.xeppaka.emi.service.ProductsService;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ProductsController.URI)
public class ProductsController {
    static final String URI = "/api/products";

    @Autowired
    private ProductsService productsService;

    @RequestMapping(method = RequestMethod.GET)
    public List<ProductDto> getProducts() {
        return productsService.getProducts();
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public List<ProductDto> updateProducts(@RequestBody Collection<ProductDto> products, Principal principal) throws EmiWarehouseException {
        Validate.notNull(products);
        Validate.notEmpty(products);

        return productsService.updateProducts(UserName.userName(principal.getName().toUpperCase()), products);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto product, Principal principal) throws EmiWarehouseException {
        Validate.notNull(product);

        final ProductDto createdProduct = productsService.createProduct(UserName.userName(principal.getName().toUpperCase()),
                product.getName(),
                product.getPrice(),
                product.getMultiplicity(),
                product.getNote(),
                product.getCategoryId(),
                product.getFeatures(),
                product.getImageThumbnail(),
                product.getImage(),
                product.getWeight());

        final URI uri = java.net.URI.create(URI + "/" + createdProduct.getProductId());
        return ResponseEntity.created(uri).body(createdProduct);
    }

    @RequestMapping(value = "{productId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID productId, Principal principal) throws EmiWarehouseException {
        Validate.notNull(productId);

        productsService.deleteProduct(UserName.userName(principal.getName().toUpperCase()), productId);
        return ResponseEntity.noContent().build();
    }
}
