package com.eyuelwoldemichael.mealtime.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import java.util.*;


@Entity
@Table(name = "collections")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Collection extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    @OneToMany(mappedBy = "collection", fetch = FetchType.LAZY, orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.EXTRA)
    private Set<Recipe> recipes;

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
        Collection other = (Collection) obj;
        return Objects.equals(id, other.getId());
    }

}
