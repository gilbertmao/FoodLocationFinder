package com.springboot.foodlocationfinder;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.cloud.gcp.pubsub.enabled=false",
        "spring.cloud.gcp.storage.enabled=false"
})
class FoodLocationFinderApplicationTests {

	@Test
	void contextLoads() {
	}

}
