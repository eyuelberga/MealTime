export interface PaginatedResponse<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    currentItems: number;
    size: number;
}