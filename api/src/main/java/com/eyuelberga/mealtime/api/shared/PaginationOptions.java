package com.eyuelberga.mealtime.api.shared;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

@Data
@AllArgsConstructor
public class PaginationOptions {
    private String search;
    private int page;
    private int size;
    private String[] sort;
}
