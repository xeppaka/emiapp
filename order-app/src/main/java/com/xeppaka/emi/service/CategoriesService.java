package com.xeppaka.emi.service;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.CategoriesRepository;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoriesService {
    @Autowired
    private EmiCommandHandler emiCommandHandler;
    @Autowired
    private CategoriesRepository categoriesRepository;

    public UUID createCategory(UserName userName, String name, UUID parentCategoryId) throws EmiWarehouseException {
        try {
            final UUID categoryId = UUID.randomUUID();
            final CreateCategoryCommand createCategoryCommand = new CreateCategoryCommand(categoryId, name, parentCategoryId);
            emiCommandHandler.handle(userName, createCategoryCommand);

            return categoryId;
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while creating category.", e);
        }
    }

    public List<CategoryDto> getCategories() {
        return categoriesRepository.getCategories();
    }
}
