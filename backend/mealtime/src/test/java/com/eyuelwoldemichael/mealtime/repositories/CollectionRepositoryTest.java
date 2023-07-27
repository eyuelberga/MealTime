package com.eyuelwoldemichael.mealtime.repositories;

import com.eyuelwoldemichael.mealtime.models.Collection;
import com.eyuelwoldemichael.mealtime.models.Nutrition;
import com.eyuelwoldemichael.mealtime.models.Recipe;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.*;

import static org.assertj.core.api.BDDAssertions.then;

@DataJpaTest()
public class CollectionRepositoryTest {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private TestEntityManager testEntityManager;


    @DisplayName("Should create collection with name and description")
    @Test
    void testCreateCollection() {
        //given
        String user = "username";
        Collection newCollection = Collection.builder().name("Collection 1").description("Some description").createdBy(user).lastModifiedBy(user).build();
        //when
        Collection savedCollection = testEntityManager.persistFlushFind(newCollection);

        //then
        then(savedCollection).isNotNull();
        then(savedCollection.getName()).isEqualTo(newCollection.getName());
        then(savedCollection.getDescription()).isEqualTo(newCollection.getDescription());
    }

    @DisplayName("Should create collection with only name")
    @Test
    void testCreateCollectionWithoutDescription() {
        //given
        String user = "username";
        Collection newCollection = Collection.builder().name("Collection 1").createdBy(user).lastModifiedBy(user).build();
        //when
        Collection savedCollection = testEntityManager.persistFlushFind(newCollection);

        //then
        then(savedCollection).isNotNull();
        then(savedCollection.getName()).isEqualTo(newCollection.getName());
        then(savedCollection.getDescription()).isNullOrEmpty();
    }

    @DisplayName("Should get Collection by id and creator if exists")
    @Test
    void testFindByIdAndCreatedBy_returnsCollectionOnMatch() {
        //given
        String user = "username";
        Collection newCollection = Collection.builder().name("Collection 1").description("Some description").createdBy(user).lastModifiedBy(user).build();
        Collection savedCollection = testEntityManager.persistFlushFind(newCollection);
        //when
        Optional<Collection> collection = collectionRepository.findByIdAndCreatedBy(savedCollection.getId(), user);

        //then
        then(collection.isPresent()).isTrue();
        then(collection.get().getId()).isEqualTo(savedCollection.getId());
    }

    @DisplayName("Should get no Collection by id and creator if it doesn't exist")
    @Test
    void testFindByIdAndCreatedBy_returnsNullIfNoMatch() {
        //given
        String user = "username";
        Collection newCollection = Collection.builder().name("Collection 1").description("Some description").createdBy(user).lastModifiedBy(user).build();
        String wrongUser = "username2";
        String wrongId = "wrongId";
        Collection savedCollection = testEntityManager.persistFlushFind(newCollection);

        //when
        Optional<Collection> collection1 = collectionRepository.findByIdAndCreatedBy(savedCollection.getId(), wrongUser);
        Optional<Collection> collection2 = collectionRepository.findByIdAndCreatedBy(wrongId, user);
        Optional<Collection> collection3 = collectionRepository.findByIdAndCreatedBy(wrongId, wrongUser);

        //then
        then(collection1.isPresent()).isFalse();
        then(collection2.isPresent()).isFalse();
        then(collection3.isPresent()).isFalse();
    }

    Recipe[] saveRecipes(String user, String collectionId) {
        Nutrition nutrition1 = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();
        Nutrition nutrition2 = Nutrition.builder().fiber(1L).calories(1L).carbohydrates(2L).cholesterol(2L).protein(3L).sugar(1L).createdBy(user).lastModifiedBy(user).build();

        Recipe recipe1 = Recipe.builder()
                .name("Recipe1")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition1)
                .createdBy(user)
                .lastModifiedBy(user)
                .collection(testEntityManager.find(Collection.class, collectionId))
                .build();
        Recipe recipe2 = Recipe.builder()
                .name("Recipe2")
                .cookTime(1)
                .prepTime(1)
                .servings(10)
                .ingredients(Arrays.asList("1", "2", "3"))
                .directions(Arrays.asList("1", "2", "3"))
                .nutrition(nutrition2)
                .createdBy(user)
                .lastModifiedBy(user)
                .collection(testEntityManager.find(Collection.class, collectionId))
                .build();
        Recipe savedRecipe1 = testEntityManager.persist(recipe1);
        Recipe savedRecipe2 = testEntityManager.persist(recipe2);
        testEntityManager.flush();
        Recipe[] recipes = new Recipe[2];
        recipes[0] = savedRecipe1;
        recipes[1] = savedRecipe2;
        return recipes;
    }


    @DisplayName("Should list all associated Recipes on Collection")
    @Test
    void testCollectionRecipeList() {
        //given
        String user = "username";
        Collection newCollection = Collection.builder()
                .name("Collection 1")
                .description("Some description")
                .createdBy(user)
                .lastModifiedBy(user)
                .build();
        String collectionId = (testEntityManager.persistFlushFind(newCollection)).getId();


        //when
        Recipe[] recipes = saveRecipes(user, collectionId);
        //then

        Collection collection = testEntityManager.find(Collection.class, collectionId);
        then(collection.getRecipes().size()).isEqualTo(2);
        then(collection.getRecipes().contains(recipes[0])).isTrue();
        then(collection.getRecipes().contains(recipes[1])).isTrue();
    }

    @DisplayName("Should update Collection")
    @Test
    void testUpdateCollection() {
        //given
        String user = "username";
        Collection newCollection = Collection.builder().name("Collection 1").description("Some description").createdBy(user).lastModifiedBy(user).build();
        Collection savedCollection = testEntityManager.persistFlushFind(newCollection);

        //when
        String updatedName = "new collection name";
        String updatedDescription = "new updated description";
        savedCollection.setName(updatedName);
        savedCollection.setDescription(updatedDescription);
        Collection updatedCollection = testEntityManager.persistFlushFind(savedCollection);
        //then
        then(updatedCollection.getId()).isEqualTo(savedCollection.getId());
        then(updatedCollection.getName()).isEqualTo(updatedName);
        then(updatedCollection.getDescription()).isEqualTo(updatedDescription);
    }

    @DisplayName("Should remove Collection")
    @Test
    void testRemoveCollection() {
        //given
        String user = "username";
        Collection newCollection = Collection.builder().name("Collection 1").description("Some description").createdBy(user).lastModifiedBy(user).build();
        Collection savedCollection = testEntityManager.persistFlushFind(newCollection);

        //when
        testEntityManager.remove(savedCollection);
        //then
        then(testEntityManager.find(Collection.class, savedCollection.getId())).isNull();
    }
}
