package com.xeppaka.emi.controllers;

import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.CategoriesRepository;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import com.xeppaka.emi.service.CategoriesService;
import com.xeppaka.emi.service.EmiWarehouseException;
import com.xeppaka.emi.service.EmiWarehouseService;

import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/api/categories")
public class CategoriesController {
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
}
