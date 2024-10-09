package com.springboot.foodlocationfinder.service;

import org.springframework.stereotype.Service;

/**
 * The {@code DistanceService} class provides a service to calculate the distance
 * between two geographical coordinates using the Haversine formula. It also provides
 * a function to convert distance to miles if needed.
 *
 * <p>This service calculates the distance between two points on the Earth's surface
 * given their latitude and longitude in degrees. The result is the shortest distance
 * between the points (the great-circle distance) measured in meters.
 */
@Service
public class DistanceService {
    // Constant representing the Earth's radius in meters
    private static final double EARTH_RAD = 6371000.0;


    /**
     * Calculates the distance between two geographical coordinates (latitude and longitude)
     * using the Haversine formula. The result is rounded to the nearest meter.
     *
     * @param lat1 Latitude of the first location in degrees.
     * @param lng1 Longitude of the first location in degrees.
     * @param lat2 Latitude of the second location in degrees.
     * @param lng2 Longitude of the second location in degrees.
     * @return The distance between the two locations in meters, rounded to the nearest meter.
     */
    public double calculateDistance(double lat1, double lng1, double lat2, double lng2) {
        double lat1Rad = Math.toRadians(lat1);
        double lng1Rad = Math.toRadians(lng1);
        double lat2Rad = Math.toRadians(lat2);
        double lng2Rad = Math.toRadians(lng2);

        double latDiff = lat2Rad - lat1Rad;
        double lngDiff = lng2Rad - lng1Rad;

        // Apply the Haversine formula to calculate the great-circle distance
        double a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
        double dist = EARTH_RAD * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        // Return the distance rounded to the nearest meter
        return Math.round(dist);        
    }
}
