package com.eyuelwoldemichael.mealtime.dto.pagination;

import lombok.Data;

import java.util.List;

@Data
public class PaginatedResponse<T> {
    private List<T> items;
    private int currentPage;
    private long totalItems;
    private int totalPages;
    private int currentItems;
    private int size;

}
