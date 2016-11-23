package com.xeppaka.emi.controllers;

import com.xeppaka.emi.service.EmiWarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping("/api/warehouse")
public class EmiWarehouseController {
    @Autowired
    private EmiWarehouseService emiWarehouseService;

    @RequestMapping(method = RequestMethod.GET)
    public EmiWarehouseService.EmiWarehouseState getWarehouseState() {
        return emiWarehouseService.getWarehouseState();
    }
}
