/*
 * Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
 */
package com.xeppaka.emi.imp.images;

import akka.actor.ActorSystem;
import akka.http.javadsl.Http;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.stream.ActorMaterializer;
import akka.stream.Materializer;
import akka.stream.javadsl.Keep;
import akka.stream.javadsl.Sink;
import akka.stream.javadsl.Source;
import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.commands.UpdateProductCommand;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.ProductsRepository;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutionException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Image importer.
 */
@Service
public class ImageImporter {
    private static final Logger log = LoggerFactory.getLogger(ImageImporter.class);
    private ProductsRepository productsRepository;
    private EmiCommandHandler commandHandler;

    private Pattern productItemPattern = Pattern.compile("<div class=\"item-container shadow relative\">\\s*?<a href=\"([^\"]+?)\" target=\"_blank\">\\s*?<div class=\"item-image-container\">\\s*?<img class=\"lazy\" data-src=\"([^\"]+?)\" alt>", Pattern.MULTILINE);
    private Pattern bigImagePattern = Pattern.compile("<div id=\"photo-gallery-links\" class=\"photo-gallery\" data-count=\"1\">\\s*?<a href=\"([^\"]+?)\"", Pattern.DOTALL);

    @Autowired
    public ImageImporter(ProductsRepository productsRepository, EmiCommandHandler commandHandler) {
        this.productsRepository = productsRepository;
        this.commandHandler = commandHandler;
    }

    public void importImages() {
        final List<ProductDto> products = productsRepository.getProducts();
        final Map<String, ProductDto> productsMap = new HashMap<>();

        for (ProductDto p : products) {
            productsMap.put(p.getImage(), p);
        }

        final ActorSystem actorSystem = ActorSystem.create();
        final Materializer materializer = ActorMaterializer.create(actorSystem);
        final Http http = Http.get(actorSystem);

        CompletionStage<Void> finish = http
                .singleRequest(HttpRequest.create("http://emischool.com/catalog/"), materializer)
                .thenApply(httpResponse -> {
                    log.info("Received headers from http://emischool.com/catalog/. Status code: {}.", httpResponse.status());
                    return httpResponse;
                })
                .thenCompose(httpResponse -> httpResponse.entity().toStrict(20000, materializer))
                .thenApply(s -> {
                    log.info("Full page is downloaded");
                    return parseImages(s.getData().decodeString("UTF-8"));
                })
                .thenCompose(i ->
                        Source
                                .from(i)
//                                .take(2)
                                .mapAsync(10, parsedImage ->
                                        downloadProductPage(http, materializer, parsedImage)
                                                .thenCompose(response -> response.entity().toStrict(20000, materializer))
                                                .thenApply(s -> parseProductFullImage(s.getData().decodeString("UTF-8")))
                                                .thenApply(image -> {
                                                    parsedImage.setFullImage(image);
                                                    return parsedImage;
                                                })
                                )
                                .toMat(Sink.seq(), Keep.right()).run(materializer)
                )
                .thenAccept(images -> images.forEach(i -> {
                    final ProductDto p = productsMap.get(i.fullImage);

                    if (p == null) {
                        log.error("Product not found: {}, image: {}", i.productUri, i.fullImage);
                    } else {
                        try {
                            commandHandler.handle(UserName.SYSTEM_USER_NAME,
                                    new UpdateProductCommand(p.getProductId(), p.getName(), p.getPrice(), p.getMultiplicity(), p.getCategoryId(),
                                            p.getFeatures(), i.thumbnailImage, p.getImage(), p.getNote(), p.getWeight()));
                        } catch (CommandHandleException e) {
                            log.error(MessageFormat.format("Error updating product: {}.", p), e);
                        }
                    }
                }))
                .thenRun(actorSystem::terminate);

        try {
            finish.toCompletableFuture().get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }

    private CompletionStage<HttpResponse> downloadProductPage(Http http, Materializer mat, ParsedProductImages parsedThumbnailImage) {
        final String productUri = "http://emischool.com" + parsedThumbnailImage.getProductUri();
        return http.singleRequest(HttpRequest.create(productUri), mat);
    }

    private String parseProductFullImage(String productPage) {
        final Matcher m = bigImagePattern.matcher(productPage);

        if (m.find()) {
            return "http://emischool.com" + m.group(1);
        } else {
            return "";
        }
    }

    private List<ParsedProductImages> parseImages(String emiHtmlPage) {
        final List<ParsedProductImages> parsedImages = new ArrayList<>();
        final Matcher m = productItemPattern.matcher(emiHtmlPage);

        while (m.find()) {
            log.info("URI: {}, image: {}.", m.group(1), m.group(2));
            parsedImages.add(new ParsedProductImages(m.group(1), "http://www.emischool.com" + m.group(2)));
        }

        return parsedImages;
    }

    private static class ParsedProductImages {
        private String productUri;
        private String thumbnailImage;
        private String fullImage;

        public ParsedProductImages(String productUri, String thumbnailImage) {
            this.productUri = productUri;
            this.thumbnailImage = thumbnailImage;
        }

        public ParsedProductImages(String productUri, String thumbnailImage, String fullImage) {
            this.productUri = productUri;
            this.thumbnailImage = thumbnailImage;
            this.fullImage = fullImage;
        }

        public String getProductUri() {
            return productUri;
        }

        public String getThumbnailImage() {
            return thumbnailImage;
        }

        public String getFullImage() {
            return fullImage;
        }

        public void setFullImage(String fullImage) {
            this.fullImage = fullImage;
        }

        @Override
        public String toString() {
            return "ParsedProductImages{" +
                    "productUri='" + productUri + '\'' +
                    ", thumbnailImage='" + thumbnailImage + '\'' +
                    ", fullImage='" + fullImage + '\'' +
                    '}';
        }
    }
}
