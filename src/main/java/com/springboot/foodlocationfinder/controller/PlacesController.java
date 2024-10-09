package com.springboot.foodlocationfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;

import com.springboot.foodlocationfinder.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller handles API requests related to fetching location-based data using Google Places API.
 * It provides endpoints for retrieving the API key and searching for places based on a given location.
 */
@RestController
public class PlacesController {
    @Autowired
    private PlacesService placesService;
    @Autowired
    /**
     * Gets the api key from the user so that their request is valid
     * @return user's api key
     */
    @GetMapping("/apikey")
    public String getAPIKey() {
        //requests the API Key from PlaceService
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
