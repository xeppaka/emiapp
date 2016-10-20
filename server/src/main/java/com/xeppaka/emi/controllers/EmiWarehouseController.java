package com.xeppaka.emi.controllers;

import com.xeppaka.emi.service.dto.EmiWarehouseDto;
import com.xeppaka.emi.service.EmiWarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
public class EmiWarehouseController {
    @Autowired
    private EmiWarehouseService emiWarehouseService;

    @RequestMapping(value = "/warehouse", method = RequestMethod.GET)
    public EmiWarehouseDto getWarehouseState() {
        return emiWarehouseService.getWarehouseState();
    }
}
