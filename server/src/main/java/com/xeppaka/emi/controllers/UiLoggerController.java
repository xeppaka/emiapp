/*
 * Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
 */
package com.xeppaka.emi.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(UiLoggerController.URI)
public class UiLoggerController {
    static final String URI = "/api/uilogger";
    private static final Logger log = LoggerFactory.getLogger("com.xeppaka.emi.ui");

    @RequestMapping(value = "/error", method = RequestMethod.POST)
    public ResponseEntity<Void> createErrorRecord(@RequestBody String data, Principal principal) {
        log.error("Error occurred for user: {}.", principal.getName());
        log.error(data);

        return ResponseEntity.noContent().build();
    }
}
