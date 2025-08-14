package com.tusgusticos.tus_gusticos_intellij;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Spring Boot
 * Inicia el servidor y configura los componentes
 */
@SpringBootApplication
public class TusGusticosIntellijApplication {

    public static void main(String[] args) {
        SpringApplication.run(TusGusticosIntellijApplication.class, args);
        System.out.println("=================================");
        System.out.println("Servidor iniciado en puerto 8080");
        System.out.println("API disponible en: http://localhost:8080/api");
        System.out.println("=================================");
    }
}

