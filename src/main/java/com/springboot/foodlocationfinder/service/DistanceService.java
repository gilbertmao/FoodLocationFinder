package com.springboot.foodlocationfinder.service;

import org.springframework.stereotype.Service;

@Service
public class DistanceService {
    private static final double EARTH_RAD = 6371000.0;

    public double calculateDistance(double lat1, double lng1, double lat2, double lng2) {
        double lat1Rad = Math.toRadians(lat1);
        double lng1Rad = Math.toRadians(lng1);
        double lat2Rad = Math.toRadians(lat2);
        double lng2Rad = Math.toRadians(lng2);

        double latDiff = lat2Rad - lat1Rad;
        double lngDiff = lng2Rad - lng1Rad;
        
        double a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
        double dist = EARTH_RAD * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return Math.round(dist);        
    }
}
