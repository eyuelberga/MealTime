package com.eyuelwoldemichael.mealtime.repositories;

import com.eyuelwoldemichael.mealtime.models.*;
import com.eyuelwoldemichael.mealtime.models.Recipe;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.sql.Date;
import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.BDDAssertions.then;

@DataJpaTest()
public class RecipeRepositoryTest {

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private TestEntityManager testEntityManager;


    @DisplayName("Should create recipe")
    @Test
    void testCreateRecipe() {
        //given
        String user = "username";
        Nutrition nutrition = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();
        Recipe newRecipe = Recipe.builder()
                .name("Recipe1")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition)
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        //when
        Recipe savedRecipe = testEntityManager.persistFlushFind(newRecipe);

        //then
        then(savedRecipe).isNotNull();
        then(savedRecipe.getName()).isEqualTo(newRecipe.getName());
        then(savedRecipe.getDescription()).isEqualTo(newRecipe.getDescription());
    }


    @DisplayName("Should get Recipe by id and creator if exists")
    @Test
    void testFindByIdAndCreatedBy_returnsRecipeOnMatch() {
        //given
        String user = "username";
        Nutrition nutrition = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();
        Recipe newRecipe = Recipe.builder()
                .name("Recipe1")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition)
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        //when
        Recipe savedRecipe = testEntityManager.persistFlushFind(newRecipe);
        //when
        Optional<Recipe> recipe = recipeRepository.findByIdAndCreatedBy(savedRecipe.getId(), user);

        //then
        then(recipe.isPresent()).isTrue();
        then(recipe.get().getId()).isEqualTo(savedRecipe.getId());
    }

    @DisplayName("Should get no Recipe by id and creator if it doesn't exist")
    @Test
    void testFindByIdAndCreatedBy_returnsNullIfNoMatch() {
        //given
        String user = "username";
        Nutrition nutrition = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();
        Recipe newRecipe = Recipe.builder()
                .name("Recipe1")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition)
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        String wrongUser = "username2";
        String wrongId = "wrongId";
        Recipe savedRecipe = testEntityManager.persistFlushFind(newRecipe);

        //when
        Optional<Recipe> recipe1 = recipeRepository.findByIdAndCreatedBy(savedRecipe.getId(), wrongUser);
        Optional<Recipe> recipe2 = recipeRepository.findByIdAndCreatedBy(wrongId, user);
        Optional<Recipe> recipe3 = recipeRepository.findByIdAndCreatedBy(wrongId, wrongUser);

        //then
        then(recipe1.isPresent()).isFalse();
        then(recipe2.isPresent()).isFalse();
        then(recipe3.isPresent()).isFalse();
    }

    MealPlan[] saveMealPlans(String user, String recipeId) {
        MealPlan mealPlan1 = MealPlan.builder()
                .date(Date.valueOf("2022-07-23"))
                .mealType(MealType.BREAKFAST)
                .recipe(testEntityManager.find(Recipe.class, recipeId))
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        MealPlan mealPlan2 = MealPlan.builder()
                .date(Date.valueOf("2022-08-23"))
                .mealType(MealType.LUNCH)
                .recipe(testEntityManager.find(Recipe.class, recipeId))
                .createdBy(user)
                .lastModifiedBy(user)
                .build();

        MealPlan savedMealPlan1 = testEntityManager.persist(mealPlan1);
        MealPlan savedMealPla2 = testEntityManager.persist(mealPlan2);
        testEntityManager.flush();
        MealPlan[] mealPlans = new MealPlan[2];
        mealPlans[0] = savedMealPlan1;
        mealPlans[1] = savedMealPla2;
        return mealPlans;
    }


    @DisplayName("Should list all associated Meal Plans on Recipe")
    @Test
    void testRecipeMealPlanList() {
        //given
        String user = "username";
        Nutrition nutrition = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();
        Recipe newRecipe = Recipe.builder()
                .name("Recipe1")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition)
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        String recipeId = (testEntityManager.persistFlushFind(newRecipe)).getId();


        //when
        MealPlan[] mealPlans = saveMealPlans(user, recipeId);
        //then

        Recipe recipe = testEntityManager.find(Recipe.class, recipeId);
        then(recipe.getMealPlans().size()).isEqualTo(2);
        then(recipe.getMealPlans().contains(mealPlans[0])).isTrue();
        then(recipe.getMealPlans().contains(mealPlans[1])).isTrue();
    }

    @DisplayName("Should update Recipe")
    @Test
    void testUpdateRecipe() {
        //given
        String user = "username";
        Nutrition nutrition = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();
        Recipe newRecipe = Recipe.builder()
                .name("Recipe1")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition)
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        Recipe savedRecipe = testEntityManager.persistFlushFind(newRecipe);

        //when
        String updatedName = "new recipe name";
        String updatedDescription = "new updated description";
        savedRecipe.setName(updatedName);
        savedRecipe.setDescription(updatedDescription);
        Recipe updatedRecipe = testEntityManager.persistFlushFind(savedRecipe);
        //then
        then(updatedRecipe.getId()).isEqualTo(savedRecipe.getId());
        then(updatedRecipe.getName()).isEqualTo(updatedName);
        then(updatedRecipe.getDescription()).isEqualTo(updatedDescription);
    }

    @DisplayName("Should remove Recipe")
    @Test
    void testRemoveRecipe() {
        //given
        String user = "username";
        Nutrition nutrition = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();
        Recipe newRecipe = Recipe.builder()
                .name("Recipe1")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition)
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        Recipe savedRecipe = testEntityManager.persistFlushFind(newRecipe);

        //when
        testEntityManager.remove(savedRecipe);
        //then
        then(testEntityManager.find(Recipe.class, savedRecipe.getId())).isNull();
    }
}
