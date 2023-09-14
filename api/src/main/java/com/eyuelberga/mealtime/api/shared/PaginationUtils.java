package com.eyuelberga.mealtime.api.shared;

import com.eyuelberga.mealtime.api.collection.Collection;
import com.eyuelberga.mealtime.api.recipe.dto.response.RecipeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class PaginationUtils {

    public static Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }

    public static List<Sort.Order> getSortOrder(String[] sort) {
        List<Sort.Order> orders = new ArrayList<>();

        if (sort[0].contains(",")) {
            // will sort more than 2 fields
            // sortOrder="field, direction"
            for (String sortOrder : sort) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            }
        } else {
            // sort=[field, direction]
            orders.add(new Sort.Order(getSortDirection(sort[1]), sort[0]));
        }
        return orders;
    }

    public static Pageable getPageable(PaginationOptions options) {
        return PageRequest.of(options.getPage(), options.getSize(), Sort.by(getSortOrder(options.getSort())));
    }

    public static <T, G> PaginatedResponse<G> getPaginatedResponse(Page<T> page, Function<T, G> mapperFunction) {
        List<G> items = page.getContent().stream().map(mapperFunction).toList();
        return PaginatedResponse.<G>builder()
                .items(items)
                .currentPage(page.getNumber())
                .totalItems(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .currentItems(page.getNumberOfElements())
                .size(page.getSize())
                .build();
    }
}
