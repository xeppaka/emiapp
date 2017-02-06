package com.xeppaka.emi.service;

import java.util.Collection;
import java.util.Collections;
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
import com.xeppaka.emi.domain.entities.Category;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.CategoriesRepository;
import com.xeppaka.emi.persistence.view.ProductsRepository;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import com.xeppaka.emi.persistence.view.dto.ProductDto;

@Service
public class CategoriesService {
    @Autowired
    private EmiCommandHandler emiCommandHandler;
    @Autowired
    private CategoriesRepository categoriesRepository;
    @Autowired
    private ProductsRepository productsRepository;

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

    public CategoryDto getCategory(UUID id) {
        return categoriesRepository.getCategory(id);
    }

    public boolean isCategoryUnderPos(UUID id) {
        if (id.equals(Category.ROOT_CATEGORY_ID)) {
            return false;
        }

        final CategoryDto categoryDto = getCategory(id);
        final UUID parentCategoryId = categoryDto.getParentCategoryId();

        return (categoryDto.getName().equals("POS") && parentCategoryId.equals(Category.ROOT_CATEGORY_ID)) || isCategoryUnderPos(parentCategoryId);
    }

    public DeleteCategoryResult deleteCategory(UserName userName, UUID categoryId) throws EmiWarehouseException {
        try {
            final List<UUID> categoryIdsBefore = categoriesRepository.getCategoryIds();
            final List<ProductDto> productsBefore =
                    productsRepository.getProductsForCategories(Collections.singletonList(Category.ROOT_CATEGORY_ID));

            emiCommandHandler.handle(userName, new DeleteCategoryCommand(categoryId));

            final List<UUID> categoryIdsAfter = categoriesRepository.getCategoryIds();
            final List<ProductDto> productsAfter =
                    productsRepository.getProductsForCategories(Collections.singletonList(Category.ROOT_CATEGORY_ID));

            categoryIdsBefore.removeAll(categoryIdsAfter);
            productsAfter.removeAll(productsBefore);

            return new DeleteCategoryResult(categoryIdsBefore, productsAfter);
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while deleting category.", e);
        }
    }
}
