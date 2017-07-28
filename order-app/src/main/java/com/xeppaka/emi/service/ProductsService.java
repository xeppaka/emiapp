package com.xeppaka.emi.service;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.commands.DeleteProductCommand;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.commands.UpdateProductCommand;
import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.ProductsRepository;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductsService {
    private static final Logger log = LoggerFactory.getLogger(ProductsService.class);

    private EmiCommandHandler emiCommandHandler;
    private ProductsRepository productsRepository;

    @Autowired
    public ProductsService(EmiCommandHandler emiCommandHandler, ProductsRepository productsRepository) {
        this.emiCommandHandler = emiCommandHandler;
        this.productsRepository = productsRepository;
    }

    @Transactional
    public ProductDto createProduct(UserName userName, String name, int price, int multiplicity,
                              String note, UUID categoryId, Collection<ProductFeature> features,
                              String imageThumbnail, String image, int weight) throws EmiWarehouseException {
        log.info(MessageFormat.format("User: {0}. Creating product. Name: ''{1}'', price: {2}, multiplicity: {3}, note: ''{4}'', categoryId: {5}, features: {6}, imageThumbnail: ''{7}'', image: ''{8}'', weight: {9}.",
                userName, name, price, multiplicity, note, categoryId, features, imageThumbnail, image, weight));

        try {
            final UUID productId = UUID.randomUUID();
            final CreateProductCommand createProductCommand =
                    new CreateProductCommand(productId, name, price, multiplicity, note,
                            categoryId, features, imageThumbnail, image, weight);
            emiCommandHandler.handle(userName, createProductCommand);

            final ProductDto product = productsRepository.getProduct(productId);
            log.info("User: {}. Created product: {}.", userName, product);
            return product;
        } catch (CommandHandleException e) {
            log.error("Error while handling command.", e);
            throw new EmiWarehouseException("Error occurred while creating product.", e);
        }
    }

    @Transactional
    public List<ProductDto> updateProducts(UserName userName, Collection<ProductDto> products) throws EmiWarehouseException {
        try {
            for (ProductDto product : products) {
                log.info("User: {}. Updating product: '{}'.", userName, product.getName());

                emiCommandHandler.handle(userName,
                        new UpdateProductCommand(product.getProductId(), product.getName(), product.getPrice(),
                                product.getMultiplicity(), product.getCategoryId(), product.getFeatures(),
                                product.getImageThumbnail(), product.getImage(), product.getNote(), product.getWeight()));
                log.info("User: {}. Update product success.", userName);
            }

            return productsRepository.getProducts(products.stream().map(ProductDto::getProductId).collect(Collectors.toList()));
        } catch (CommandHandleException e) {
            log.error("Error while handling command.", e);
            throw new EmiWarehouseException("Error occurred while updating products.", e);
        }
    }

    public List<ProductDto> getProducts() {
        return productsRepository.getProducts();
    }

    public ProductDto getProduct(UUID id) {
        return productsRepository.getProduct(id);
    }

    @Transactional
    public void deleteProduct(UserName userName, UUID productId) throws EmiWarehouseException {
        log.info("User: {}. Deleting product with id: {}.", userName, productId);

        try {
            emiCommandHandler.handle(userName, new DeleteProductCommand(productId));
            log.info("User: {}. Delete product success.", userName);
        } catch (CommandHandleException e) {
            log.error("Error while handling command.", e);
            throw new EmiWarehouseException("Error occurred while deleting product.", e);
        }
    }
}
