package com.xeppaka.emi.controllers;

import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import com.xeppaka.emi.service.CategoriesService;
import com.xeppaka.emi.service.EmiWarehouseException;

@RestController
@RequestMapping(CategoriesController.URI)
public class CategoriesController {
    static final String URI = "/api/categories";

    @Autowired
    private CategoriesService categoriesService;

    @RequestMapping(method = RequestMethod.GET)
    public List<CategoryDto> getCategories() {
        return categoriesService.getCategories();
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public List<CategoryDto> updateCategories(@RequestBody Collection<CategoryDto> categories) throws EmiWarehouseException {
        Validate.notNull(categories);
        Validate.notEmpty(categories);

        return categoriesService.updateCategories(UserName.SYSTEM_USER_NAME, categories);
    }

    @RequestMapping(value = "{categoryId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID categoryId) throws EmiWarehouseException {
        Validate.notNull(categoryId);

        categoriesService.deleteCategory(UserName.SYSTEM_USER_NAME, categoryId);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto category) throws EmiWarehouseException {
        Validate.notNull(category);

        final CategoryDto createdCategory = categoriesService.createCategory(UserName.SYSTEM_USER_NAME,
                category.getName(),
                category.getParentCategoryId(),
                category.getWeight());

        final URI uri = java.net.URI.create(URI + "/" + createdCategory.getCategoryId());
        return ResponseEntity.created(uri).body(createdCategory);
    }
}
