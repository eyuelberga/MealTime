package com.eyuelwoldemichael.mealtime;

import com.eyuelwoldemichael.mealtime.configs.StorageProperties;
import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeInfoResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeResponse;
import com.eyuelwoldemichael.mealtime.models.Collection;
import com.eyuelwoldemichael.mealtime.models.MealPlan;
import com.eyuelwoldemichael.mealtime.models.Recipe;
import com.fasterxml.jackson.databind.DeserializationFeature;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Main entry point for the application
 *
 * @author Eyuel Woldemichael
 */
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class MealtimeApplication {


    /**
     * Managed Bean for mapping between objects
     *
     * @return org.modelmapper.ModelMapper
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE).setAmbiguityIgnored(true);
        PropertyMap<Collection, CollectionResponse> collectionPropertyMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setId(source.getId());
                map().setName(source.getName());
                map().setDescription(source.getDescription());
                map().setCreatedAt(source.getCreatedAt());
                map().setUpdatedAt(source.getUpdatedAt());

            }
        };
        PropertyMap<Recipe, RecipeInfoResponse> recipeInfoPropertyMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setId(source.getId());
                map().setName(source.getName());
                map().setDescription(source.getDescription());
                map().setImage(source.getImage());
                map().setSource(source.getSource());
                map().setServings(source.getServings());
                map().setPrepTime(source.getPrepTime());
                map().setCookTime(source.getCookTime());
                map().setCreatedAt(source.getCreatedAt());
                map().setUpdatedAt(source.getUpdatedAt());

            }
        };
        modelMapper.addMappings(collectionPropertyMap);
        modelMapper.addMappings(recipeInfoPropertyMap);


        return modelMapper;

    }

    /**
     * Managed bean for mapping json to POJO
     *
     * @return
     */
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public static void main(String[] args) {
        SpringApplication.run(MealtimeApplication.class, args);
    }

}
