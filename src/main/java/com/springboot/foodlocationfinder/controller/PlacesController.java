package com.springboot.foodlocationfinder.controller;

import com.springboot.foodlocationfinder.service.DistanceService;
import com.springboot.foodlocationfinder.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
    private DistanceService distanceService;
    
    @GetMapping("/apikey")
    public String getAPIKey() {
        return placesService.getApiKey();
    }

    @GetMapping("/places")
    public String getPlaces(String location, int radius, String[] types) {
        return placesService.search(location, radius, types);
    }
    @GetMapping("/formatted")
    public List<Map<String, Object>> getNameAndLocation(String location, int radius, String[] types) {
        String places = getPlaces(location, radius, types);
        List<Map<String,Object>> out = new ArrayList<>();
        JSONObject response = new JSONObject(places);
        JSONArray results = response.getJSONArray("results");
        System.out.println(location);
        double currLat = Double.parseDouble(location.split(",")[0]);
        double currLng = Double.parseDouble(location.split(",")[1]);
    
        for (int i = 0; i < results.length(); i++) {
            JSONObject place = results.getJSONObject(i);
            System.out.println(place);
            Map<String, Object> tempMap = new HashMap<>();
            tempMap.put("Name", place.getString("name"));
            tempMap.put("Vicinity", place.getString("vicinity"));
            tempMap.put("Operational", place.getString("business_status"));
            tempMap.put("Rating", place.getDouble("rating"));
            Map<String, Double> tempLoc = new HashMap<>();
            double lat = place.getJSONObject("geometry").getJSONObject("location").getDouble("lat");
            double lng = place.getJSONObject("geometry").getJSONObject("location").getDouble("lng");
            tempLoc.put("Lat", lat);
            tempLoc.put("Long", lng);
            tempMap.put("Location", tempLoc);
            tempMap.put("Distance",distanceService.calculateDistance(currLat, currLng, lat, lng));
            out.add(tempMap);
        }
        return out;
    }

}
