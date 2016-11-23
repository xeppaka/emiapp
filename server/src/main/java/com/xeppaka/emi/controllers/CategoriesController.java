package com.xeppaka.emi.controllers;

import com.xeppaka.emi.persistence.view.CategoriesRepository;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import com.xeppaka.emi.service.CategoriesService;
import com.xeppaka.emi.service.EmiWarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    public List<CategoryDto> updateCategories() {
        throw new UnsupportedOperationException();
    }
}
