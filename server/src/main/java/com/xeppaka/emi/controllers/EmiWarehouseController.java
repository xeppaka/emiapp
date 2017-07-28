package com.xeppaka.emi.controllers;

import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.dto.UiCategoryDto;
import com.xeppaka.emi.dto.UiEmiWarehouseState;
import com.xeppaka.emi.dto.UiProductDto;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import com.xeppaka.emi.service.CategoriesService;
import com.xeppaka.emi.service.DeleteCategoryResult;
import com.xeppaka.emi.service.EmiWarehouseException;
import com.xeppaka.emi.service.ProductsService;
import org.apache.commons.lang3.Validate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 *
 */
@RestController
@RequestMapping("/api")
public class EmiWarehouseController {
    private static final String CATEGORIES_URI = "/api/categories";
    private static final String PRODUCTS_URI = "/api/products";

    private CategoriesService categoriesService;
    private ProductsService productsService;

    public EmiWarehouseController(CategoriesService categoriesService, ProductsService productsService) {
        this.categoriesService = categoriesService;
        this.productsService = productsService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "warehouse")
    public UiEmiWarehouseState getWarehouseState() {
        final List<UiProductDto> productDtos = toUiProducts(productsService.getProducts());
        final List<UiCategoryDto> categoryDtos = toUiCategories(categoriesService.getCategories());

        final Map<UUID, UiProductDto> productDtoMap = new HashMap<>();
        productDtos.forEach(uiProductDto -> productDtoMap.put(uiProductDto.getProduct().getProductId(), uiProductDto));
        final Map<UUID, UiCategoryDto> categoryDtoMap = new HashMap<>();
        categoryDtos.forEach(categoryDto -> categoryDtoMap.put(categoryDto.getCategoryDto().getCategoryId(), categoryDto));

        return new UiEmiWarehouseState(productDtoMap, categoryDtoMap);
    }

    @RequestMapping(method = RequestMethod.GET, value = "categories")
    public List<UiCategoryDto> getCategories() {
        return toUiCategories(categoriesService.getCategories());
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "categories")
    public List<CategoryDto> updateCategories(@RequestBody Collection<CategoryDto> categories, Principal principal) throws EmiWarehouseException {
        Validate.notNull(categories);
        Validate.notEmpty(categories);

        return categoriesService.updateCategories(UserName.userName(principal.getName().toUpperCase()), categories);
    }

    @RequestMapping(value = "categories/{categoryId}", method = RequestMethod.DELETE)
    public ResponseEntity<DeleteCategoryResult> deleteCategory(@PathVariable UUID categoryId, Principal principal) throws EmiWarehouseException {
        Validate.notNull(categoryId);

        final DeleteCategoryResult deleteCategoryResult = categoriesService.deleteCategory(UserName.userName(principal.getName().toUpperCase()), categoryId);
        return ResponseEntity.ok(deleteCategoryResult);
    }

    @RequestMapping(method = RequestMethod.POST, value = "categories")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto category, Principal principal) throws EmiWarehouseException {
        Validate.notNull(category);

        final CategoryDto createdCategory = categoriesService.createCategory(UserName.userName(principal.getName().toUpperCase()),
                category.getName(),
                category.getParentCategoryId(),
                category.getWeight());

        final URI uri = java.net.URI.create(CATEGORIES_URI + "/" + createdCategory.getCategoryId());
        return ResponseEntity.created(uri).body(createdCategory);
    }

    @RequestMapping(method = RequestMethod.GET, value = "products")
    public List<UiProductDto> getProducts() {
        return toUiProducts(productsService.getProducts());
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "products")
    public List<ProductDto> updateProducts(@RequestBody Collection<ProductDto> products, Principal principal) throws EmiWarehouseException {
        Validate.notNull(products);
        Validate.notEmpty(products);

        return productsService.updateProducts(UserName.userName(principal.getName().toUpperCase()), products);
    }

    @RequestMapping(method = RequestMethod.POST, value = "products")
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

        final URI uri = java.net.URI.create(PRODUCTS_URI + "/" + createdProduct.getProductId());
        return ResponseEntity.created(uri).body(createdProduct);
    }

    @RequestMapping(value = "products/{productId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID productId, Principal principal) throws EmiWarehouseException {
        Validate.notNull(productId);

        productsService.deleteProduct(UserName.userName(principal.getName().toUpperCase()), productId);
        return ResponseEntity.noContent().build();
    }

    private List<UiProductDto> toUiProducts(List<ProductDto> products) {
        return products.stream()
                .map(productDto ->
                        new UiProductDto(productDto,
                                !categoriesService.isCategoryUnderPos(productDto.getCategoryId()),
                                categoriesService.isCategoryUnderCertificate(productDto.getCategoryId()))).collect(Collectors.toList());
    }

    private List<UiCategoryDto> toUiCategories(List<CategoryDto> categories) {
        return categories.stream()
                .map(categoryDto -> new UiCategoryDto(categoryDto, !categoriesService.isCategoryUnderPos(categoryDto.getCategoryId()),
                        categoriesService.isCategoryUnderCertificate(categoryDto.getCategoryId()))).collect(Collectors.toList());
    }
}
