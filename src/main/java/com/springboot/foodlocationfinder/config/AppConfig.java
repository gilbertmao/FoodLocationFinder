package com.springboot.foodlocationfinder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * The AppConfig class provides configuration settings for the application.
 *
 * <p>This class is annotated with @Configuration to indicate that it is a
 * configuration class that defines beans for Spring's application context.
 */
@Configuration
public class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
