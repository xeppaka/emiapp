package com.xeppaka.emi.service;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.DeleteCategoryCommand;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.commands.UpdateCategoryCommand;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.CategoriesRepository;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;

@Service
public class CategoriesService {
    @Autowired
    private EmiCommandHandler emiCommandHandler;
    @Autowired
    private CategoriesRepository categoriesRepository;

    public CategoryDto createCategory(UserName userName, String name, UUID parentCategoryId, int weight) throws EmiWarehouseException {
        try {
            final UUID categoryId = UUID.randomUUID();
            final CreateCategoryCommand createCategoryCommand = new CreateCategoryCommand(categoryId, name, parentCategoryId, weight);
            emiCommandHandler.handle(userName, createCategoryCommand);

            return categoriesRepository.getCategory(categoryId);
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while creating category.", e);
        }
    }

    public List<CategoryDto> updateCategories(UserName userName, Collection<CategoryDto> categories) throws EmiWarehouseException {
        try {
            for (CategoryDto category : categories) {
                emiCommandHandler.handle(userName,
                        new UpdateCategoryCommand(category.getCategoryId(),
                                category.getName(),
                                category.getParentCategoryId(),
                                category.getWeight()));
            }

            return categoriesRepository.getCategories(categories.stream().map(CategoryDto::getCategoryId).collect(Collectors.toList()));
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while updating products.", e);
        }
    }

    public List<CategoryDto> getCategories() {
        return categoriesRepository.getCategories();
    }

    public void deleteCategory(UserName userName, UUID categoryId) throws EmiWarehouseException {
        try {
            emiCommandHandler.handle(userName, new DeleteCategoryCommand(categoryId));
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while deleting category.", e);
        }
    }
}
