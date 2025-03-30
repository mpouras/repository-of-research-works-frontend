import { defineStore } from "pinia";

export const usePaginationStore = defineStore('paginationStore', {
    state: () => ({
        totalPages: 0,
        currentPage: 1,
        perPage: 0,
        totalItems: 0, 
    }),

    actions: {
        setPaginationInfo(data) {
            this.totalPages = data.last_page;
            this.currentPage = data.current_page;
            this.perPage = data.per_page;
            this.totalItems = data.total;
        },
    }
});