package com.eyuelberga.mealtime.api.recipe;

import com.eyuelberga.mealtime.api.security.Auditable;
import com.eyuelberga.mealtime.api.collection.Collection;
import com.eyuelberga.mealtime.api.mealplan.MealPlan;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.*;

@Entity
@Table(name = "recipes")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Recipe extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String image;
    @Column(columnDefinition = "TEXT")
    private String description;
    private int servings;
    private int prepTime;
    private int cookTime;
    private String source;
    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @OrderColumn(nullable = false)
    private List<String> ingredients;
    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @OrderColumn(nullable = false, columnDefinition = "TEXT")
    private List<String> directions;
    @ManyToOne(targetEntity = Collection.class, fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Collection collection;
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @LazyCollection(LazyCollectionOption.EXTRA)
    private Set<MealPlan> mealPlans;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "nutrition_id", referencedColumnName = "id", nullable = false)
    private Nutrition nutrition;


    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Recipe other = (Recipe) obj;
        return Objects.equals(id, other.getId());
    }
}
