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

import java.util.List;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PlacesController {
    @Autowired
    private PlacesService placesService;
    @Autowired
    /**
     * Returns the API key of the placesService
     */
    @GetMapping("/apikey")
    public String getAPIKey() {
        return placesService.getApiKey();
    }


    /**
     * Endpoint to search for places around a specified location within a given radius and types.
     *
     * @param lat/long - the lattitude and longitude of the location
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
