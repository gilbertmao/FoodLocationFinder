package com.springboot.foodlocationfinder.controller;

import com.springboot.foodlocationfinder.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller handles API requests related to fetching location-based data using Google Places API.
 * It provides endpoints for retrieving the API key and searching for places based on a given location.
 */
@RestController
public class PlacesController {
    @Autowired
    private PlacesService placesService;

    @GetMapping("/apikey")
    public String getAPIKey() {
        return placesService.getApiKey();
    }


    /**
     * Endpoint to search for places around a specified location within a given radius and types.
     *
     * @param location The location (latitude and longitude) around which to search, in a format like "lat,lng".
     * @param radius   The radius (in meters) within which to search for places.
     * @param types    An array of place types (e.g., "restaurant", "cafe") to filter the results.
     * @return A JSON string with search results from the Google Places API.
     */
    @GetMapping("/places")
    public String getPlaces(String location, int radius, String[] types) {
        return placesService.search(location, radius, types);
    }

}
