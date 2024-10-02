package com.springboot.foodlocationfinder.controller;

import com.springboot.foodlocationfinder.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlacesController {
    @Autowired
    private PlacesService placesService;

    @GetMapping("/apikey")
    public String getAPIKey() {
        return placesService.getApiKey();
    }

    @GetMapping("/places")
    public String getPlaces(String location, int radius, String[] types) {
        return placesService.search(location, radius, types);
    }

}
