package com.xeppaka.emi.controllers;

import com.xeppaka.emi.persistence.CategoriesRepository;
import com.xeppaka.emi.persistence.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 *
 */
@RestController
public class CategoriesController {
    @Autowired
    private CategoriesRepository categoriesRepository;

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    public List<CategoryDto> getCategories() {
        return categoriesRepository.getCategories();
    }
}
