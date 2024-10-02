package com.springboot.foodlocationfinder.service;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClient;

import com.google.maps.PlacesApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResult;
import com.google.maps.NearbySearchRequest;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class PlacesService {

    @Value("${google.maps.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    public String getApiKey() {
        return apiKey;
    }
    /**
     * Searches for places near the specified location.
     *
     * @param location the location in the format "latitude,longitude"
     * @param radius the radius in meters within which to search for places
     * @param types an array of place types to filter the search results
     * @return the search results as a JSON string
     */
    public String search(
            @RequestParam() String location,
            @RequestParam() int radius,
            @RequestParam() String[] types
            ) {

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/place/nearbysearch/json")
                .queryParam("radius", radius)
                .queryParam("location", location)
                .queryParam("key", apiKey);

        // Add each type as a separate query parameter
        for (String type : types) {
            builder.queryParam("type", type);
        }

        String url = builder.build().toUriString();

        return restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
    }
}
