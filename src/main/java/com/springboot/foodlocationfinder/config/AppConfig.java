package com.springboot.foodlocationfinder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**

 * The AppConfig class provides configuration settings for the application.
 *
 * <p>This class is annotated with @Configuration to indicate that it is a
 * configuration class that defines beans for Spring's application context.

 * The {@code AppConfig} class provides application-wide configuration for
 * the Food Location Finder application.
 *
 * <p>This class is annotated with {@code @Configuration} to indicate that
 * it contains bean definitions that will be managed by the Spring container.

 */
@Configuration
public class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
