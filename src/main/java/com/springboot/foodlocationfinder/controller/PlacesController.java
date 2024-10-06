package com.springboot.foodlocationfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.springboot.foodlocationfinder.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    @CrossOrigin(origins = "http://localhost:3000")
    public JsonNode getPlaces(
            @RequestParam String lat,
            @RequestParam String lng,
            @RequestParam int radius,
            @RequestParam String[] types
        ) {
        JsonNode result = placesService.search(lat, lng, radius, types);
        return result;
    }

}
