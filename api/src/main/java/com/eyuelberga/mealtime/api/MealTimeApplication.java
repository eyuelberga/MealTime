package com.eyuelberga.mealtime.api;

import com.eyuelberga.mealtime.api.collection.Collection;
import com.eyuelberga.mealtime.api.collection.dto.response.CollectionResponse;
import com.eyuelberga.mealtime.api.recipe.Recipe;
import com.eyuelberga.mealtime.api.recipe.dto.response.RecipeInfoResponse;
import com.eyuelberga.mealtime.api.storage.StorageProperties;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class MealTimeApplication {

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
		SpringApplication.run(MealTimeApplication.class, args);
	}

}
