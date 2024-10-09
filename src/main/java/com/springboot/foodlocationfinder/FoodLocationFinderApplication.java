package com.springboot.foodlocationfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * The main class for the Food Location Finder Application.
 *
 * This class serves as the entry point for the Spring Boot application. It
 * contains the main method which starts the Spring Boot framework.
 *
 * By annotating the class with {@code @SpringBootApplication}, it marks this as
 * the configuration class that bootstraps the application by enabling
 * auto-configuration and component scanning.
 */
@SpringBootApplication
public class FoodLocationFinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodLocationFinderApplication.class, args);
	}

}
