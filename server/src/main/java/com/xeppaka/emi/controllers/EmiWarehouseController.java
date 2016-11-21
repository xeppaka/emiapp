package com.xeppaka.emi.controllers;

import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.dto.ProductDto;
import com.xeppaka.emi.service.EmiWarehouseException;
import com.xeppaka.emi.service.EmiWarehouseService;
import com.xeppaka.emi.service.dto.EmiWarehouseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

/**
 *
 */
@RestController
@RequestMapping("/api/warehouse")
public class EmiWarehouseController {
    @Autowired
    private EmiWarehouseService emiWarehouseService;

    @RequestMapping(method = RequestMethod.GET)
    public EmiWarehouseDto getWarehouseState() {
        return emiWarehouseService.getWarehouseState();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Void> bulkUpdate(@RequestBody EmiWarehouseDto warehouse) throws EmiWarehouseException {
        final Map<UUID, ProductDto> productsMap = warehouse.getProductById();
        emiWarehouseService.updateProducts(UserName.SYSTEM_USER_NAME, productsMap.values());

        return ResponseEntity.ok().build();
    }
}
