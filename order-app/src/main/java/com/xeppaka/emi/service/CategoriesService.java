package com.xeppaka.emi.service;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoriesService {
    private static final Logger log = LoggerFactory.getLogger(ProductsService.class);

    private final EmiCommandHandler emiCommandHandler;
    private final CategoriesRepository categoriesRepository;
    private final ProductsRepository productsRepository;

    @Autowired
    public CategoriesService(EmiCommandHandler emiCommandHandler, CategoriesRepository categoriesRepository, ProductsRepository productsRepository) {
        this.emiCommandHandler = emiCommandHandler;
        this.categoriesRepository = categoriesRepository;
        this.productsRepository = productsRepository;
    }

    @Transactional
    public CategoryDto createCategory(UserName userName, String name, UUID parentCategoryId, int weight) throws EmiWarehouseException {
        log.info(MessageFormat.format("User {0}. Creating category. Name: ''{1}'', parentCategoryId: {2}, weight: {3}.",
                userName, name, parentCategoryId, weight));

        try {
            final UUID categoryId = UUID.randomUUID();
            final CreateCategoryCommand createCategoryCommand = new CreateCategoryCommand(categoryId, name, parentCategoryId, weight);
            emiCommandHandler.handle(userName, createCategoryCommand);

            final CategoryDto category = categoriesRepository.getCategory(categoryId);
            log.info("User: {}. Created category: {}.", userName, category);
            return category;
        } catch (CommandHandleException e) {
            log.error("Error while handling command.", e);
            throw new EmiWarehouseException("Error occurred while creating category.", e);
        }
    }

    @Transactional
    public List<CategoryDto> updateCategories(UserName userName, Collection<CategoryDto> categories) throws EmiWarehouseException {
        try {
            for (CategoryDto category : categories) {
                log.info("User: {}. Updating category: {}.", userName, category);

                emiCommandHandler.handle(userName,
                        new UpdateCategoryCommand(category.getCategoryId(),
                                category.getName(),
                                category.getParentCategoryId(),
                                category.getWeight()));

                log.info("User: {}. Update category success.", userName);
            }

            return categoriesRepository.getCategories(categories.stream().map(CategoryDto::getCategoryId).collect(Collectors.toList()));
        } catch (CommandHandleException e) {
            log.error("Error while handling command.", e);
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
        if (Category.ROOT_CATEGORY_ID.equals(id)) {
            return false;
        }

        final CategoryDto categoryDto = getCategory(id);
        final UUID parentCategoryId = categoryDto.getParentCategoryId();

        return (categoryDto.getName().equals("POS") && parentCategoryId.equals(Category.ROOT_CATEGORY_ID)) || isCategoryUnderPos(parentCategoryId);
    }

    public boolean isCategoryUnderCertificate(UUID id) {
        if (Category.ROOT_CATEGORY_ID.equals(id)) {
            return false;
        }

        final CategoryDto categoryDto = getCategory(id);
        final UUID parentCategoryId = categoryDto.getParentCategoryId();

        return (categoryDto.getName().equals("Certificates") && parentCategoryId.equals(Category.ROOT_CATEGORY_ID)) || isCategoryUnderCertificate(parentCategoryId);
    }

    @Transactional
    public DeleteCategoryResult deleteCategory(UserName userName, UUID categoryId) throws EmiWarehouseException {
        log.info("User: {}. Deleting category: {}.", userName, categoryId);

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

            final DeleteCategoryResult result = new DeleteCategoryResult(categoryIdsBefore, productsAfter);
            log.info("User {}. Delete category result: {}.", userName, result);
            return result;
        } catch (CommandHandleException e) {
            log.error("Error while handling command.", e);
            throw new EmiWarehouseException("Error occurred while deleting category.", e);
        }
    }
}
