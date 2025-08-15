package com.tusgusticos.tus_gusticos_intellij.config;

import com.tusgusticos.tus_gusticos_intellij.model.Categoria;
import com.tusgusticos.tus_gusticos_intellij.model.Plato;
import com.tusgusticos.tus_gusticos_intellij.repository.CategoriaRepository;
import com.tusgusticos.tus_gusticos_intellij.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Inicializador de datos para crear categorías y platos de ejemplo
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private PlatoRepository platoRepository;

    @Override
    public void run(String... args) throws Exception {
        inicializarCategorias();
        inicializarPlatos();
    }

    private void inicializarCategorias() {
        if (categoriaRepository.count() == 0) {
            // Crear las tres categorías por defecto
            Categoria corriente = new Categoria(Categoria.TipoCategoria.corriente);
            Categoria ejecutivo = new Categoria(Categoria.TipoCategoria.ejecutivo);
            Categoria carta = new Categoria(Categoria.TipoCategoria.carta);

            categoriaRepository.save(corriente);
            categoriaRepository.save(ejecutivo);
            categoriaRepository.save(carta);

            System.out.println("✅ Categorías inicializadas correctamente");
        }
    }

    private void inicializarPlatos() {
        if (platoRepository.count() == 0) {
            // Obtener categorías
            Categoria corriente = categoriaRepository.findByNombre(Categoria.TipoCategoria.corriente).orElse(null);
            Categoria ejecutivo = categoriaRepository.findByNombre(Categoria.TipoCategoria.ejecutivo).orElse(null);
            Categoria carta = categoriaRepository.findByNombre(Categoria.TipoCategoria.carta).orElse(null);

            if (corriente != null && ejecutivo != null && carta != null) {
                // Platos corrientes
                platoRepository.save(new Plato(
                    "Arroz con Pollo",
                    "Delicioso arroz amarillo con pollo, verduras y especias caseras",
                    new BigDecimal("12000"),
                    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
                    corriente
                ));

                platoRepository.save(new Plato(
                    "Bandeja Paisa",
                    "Frijoles, arroz, carne molida, chorizo, morcilla, huevo, plátano y arepa",
                    new BigDecimal("15000"),
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                    corriente
                ));

                platoRepository.save(new Plato(
                    "Sancocho de Gallina",
                    "Sopa tradicional con gallina, yuca, plátano, mazorca y cilantro",
                    new BigDecimal("14000"),
                    "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
                    corriente
                ));

                // Platos ejecutivos
                platoRepository.save(new Plato(
                    "Salmón a la Plancha",
                    "Filete de salmón fresco con vegetales salteados y salsa de mantequilla",
                    new BigDecimal("25000"),
                    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
                    ejecutivo
                ));

                platoRepository.save(new Plato(
                    "Lomo de Cerdo en Salsa BBQ",
                    "Jugoso lomo de cerdo glaseado con salsa BBQ casera y puré de papa",
                    new BigDecimal("22000"),
                    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400",
                    ejecutivo
                ));

                platoRepository.save(new Plato(
                    "Pechuga Rellena",
                    "Pechuga de pollo rellena de espinacas y queso, con arroz con almendras",
                    new BigDecimal("20000"),
                    "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
                    ejecutivo
                ));

                // Platos a la carta
                platoRepository.save(new Plato(
                    "Churrasco Premium",
                    "Corte premium de res a la parrilla con chimichurri y papas gourmet",
                    new BigDecimal("35000"),
                    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
                    carta
                ));

                platoRepository.save(new Plato(
                    "Langostinos al Ajillo",
                    "Langostinos frescos salteados en aceite de oliva, ajo y perejil",
                    new BigDecimal("32000"),
                    "https://images.unsplash.com/photo-1565680018434-b513d5573b07?w=400",
                    carta
                ));

                platoRepository.save(new Plato(
                    "Risotto de Hongos",
                    "Cremoso risotto italiano con hongos porcini y queso parmesano",
                    new BigDecimal("28000"),
                    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
                    carta
                ));

                System.out.println("✅ Platos de ejemplo inicializados correctamente");
            }
        }
    }
}