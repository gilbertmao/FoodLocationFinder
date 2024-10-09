package com.springboot.foodlocationfinder.service;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;

@Service
public class PlacesService {

    @Value("${google.maps.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    public String getApiKey() {
        return apiKey;
    }
    /**
     * Searches for places near the specified location. Main function of application.
     *
     * @param lat the latitude of the location
     * @param lng the longitude of the location
     * @param radius   the radius in meters within which to search for places
     * @param types    an array of place types to filter the search results
     * @return the search results as a JSON string
     */
    public JsonNode search(
            @RequestParam() String lat,
            @RequestParam() String lng,
            @RequestParam() int radius,
            @RequestParam() String[] types
            ) {

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/place/nearbysearch/json")
                .queryParam("radius", radius)
                .queryParam("location", String.format("%s,%s", lat, lng))
                .queryParam("key", apiKey);

        // Add each type as a separate query parameter
        for (String type : types) {
            builder.queryParam("types", type);
        }

        String url = builder.build().toUriString();

        String rawPlacesResponse = restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
        
        // Create a new object mapper to map the JSON response to a JsonNode object
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(rawPlacesResponse);

            // Results from JSON response
            JsonNode places = root.get("results");

            ArrayNode reactPayload = mapper.createArrayNode();

            int num = places.size();

            while (num > 0) {
                JsonNode result = places.get(num - 1);

                ObjectNode currPlace = mapper.createObjectNode();

                // Price level is returned as an int 1 to 4, where 1 is the cheapest and 4 is the most expensive
                if (result.get("price_level") == null) {
                    currPlace.put("price", "N/A");
                } else {
                    int priceNum = result.get("price_level").asInt();
                    String priceString = priceNum > 0 && priceNum <= 4
                            ? String.join("", Collections.nCopies(priceNum, "$"))
                            : "N/A";
                    currPlace.put("price", priceString);
                }

                // Add place name
                String grabbedName = result.get("name").asText();
                currPlace.put("displayName", grabbedName);

                // Add place address
                String grabbedAddress = result.get("vicinity").asText();
                currPlace.put("address", grabbedAddress);

                // Add place rating
                int grabbedRating = result.get("rating").asInt();
                currPlace.put("rating", grabbedRating);

                // Add place latitude and longitude
                String grabbedLat = result.get("geometry").get("location").get("lat").asText();
                currPlace.put("lat", grabbedLat);
                String grabbedLng = result.get("geometry").get("location").get("lng").asText();
                currPlace.put("lng", grabbedLng);

                reactPayload.add(currPlace);

                num--;
            }

            return reactPayload;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
