package com.springboot.foodlocationfinder.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
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
        Map<String, String> map = new HashMap<>();
        JSONObject response = new JSONObject(places);
        JSONArray results = response.getJSONArray("results");
        for (int i = 0; i < results.length(); i++) {
            JSONObject place = results.getJSONObject(i);

            Map<String, Object> tempMap = new HashMap<>();
            tempMap.put("Name", place.getString("name"));

            Map<String, Double> tempLoc = new HashMap<>();
            tempLoc.put("Lat", place.getJSONObject("geometry").getJSONObject("location").getDouble("lat"));
            tempLoc.put("Long", place.getJSONObject("geometry").getJSONObject("location").getDouble("lng"));

            tempMap.put("Location", tempLoc);

            out.add(tempMap);
        }
        System.out.println(out);
        return out;
    }

}
