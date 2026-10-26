package com.klef.soa.docker.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI parkingSessionOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Parking Session Management API")
                        .description("REST API for managing parking sessions. " +
                                "Provides endpoints to add, retrieve, and delete parking sessions.")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("KLEF SOA Docker Assignment")
                                .email("student@klef.ac.in"))
                        .license(new License()
                                .name("MIT License")));
    }
}
