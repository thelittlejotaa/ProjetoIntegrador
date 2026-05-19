package br.com.senai.infob.biblioteca.configs;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "MONITORAMENTO EPI",
        version = "1.0",
        description = "Integrantes: Rafael, João Accácio, João Gabriel e Ricardo"
    )
)

public class Swagger {
    
}
