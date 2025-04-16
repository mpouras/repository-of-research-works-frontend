<template>
    <div v-if="paginationStore.totalPages > 1"
        class="flex justify-center items-center py-3 my-5 border-t border-gray-200 w-full">
        <div class="flex items-center justify-center">
            <div class="py-3 border rounded-lg">
                <ol class="flex items-center text-sm text-gray-500 divide-x divide-gray-300">

                    <!-- Previous Button -->
                    <li>
                        <button :disabled="queryParams.page === 1" @click="handlePageChange(queryParams.page - 1)"
                            class="pagination-btn" aria-label="Previous" rel="prev">
                            <i :class="icons.back"></i>
                            Previous
                        </button>
                    </li>

                    <!-- First Page -->
                    <li>
                        <button @click="handlePageChange(1)"
                            :class="['pagination-btn', { 'active': queryParams.page === 1 }]">
                            1
                        </button>
                    </li>

                    <!-- Left Ellipsis -->
                    <li v-if="queryParams.page > 3">
                        <span class="pagination-ellipsis">...</span>
                    </li>

                    <!-- Middle Pages -->
                    <li v-for="page in visiblePages" :key="page">
                        <button @click="handlePageChange(page)"
                            :class="['pagination-btn', { 'active': queryParams.page === page }]">
                            {{ page }}
                        </button>
                    </li>

                    <!-- Right Ellipsis -->
                    <li v-if="queryParams.page < paginationStore.totalPages - 2">
                        <span class="pagination-ellipsis">...</span>
                    </li>

                    <!-- Last Page -->
                    <li>
                        <button @click="handlePageChange(paginationStore.totalPages)"
                            :class="['pagination-btn', { 'active': queryParams.page === paginationStore.totalPages }]">
                            {{ paginationStore.totalPages }}
                        </button>
                    </li>

                    <!-- Next Button -->
                    <li>
                        <button :disabled="queryParams.page === paginationStore.totalPages"
                            @click="handlePageChange(queryParams.page + 1)" class="pagination-btn" aria-label="Next"
                            rel="next">
                            Next
                            <i :class="icons.next"></i>
                        </button>
                    </li>

                </ol>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { icons } from '../utils/icons';
import { useQueryParamsStore } from '../stores/queryParams';
import { usePaginationStore } from '../stores/pagination';

const queryParamsStore = useQueryParamsStore();
const paginationStore = usePaginationStore();

const { queryParams } = queryParamsStore;

const visiblePages = computed(() => {
    const range = [];
    const delta = 2;

    const left = Math.max(2, queryParams.page - delta);
    const right = Math.min(paginationStore.totalPages - 1, queryParams.page + delta);

    for (let i = left; i <= right; i++) {
        range.push(i);
    }

    return range;
});


const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const handlePageChange = (page) => {
    if (page < 1 || page > paginationStore.totalPages) return;

    queryParamsStore.setPage(page);
    paginationStore.currentPage = page;

    scrollToTop();
};

watch(() => queryParams.page, (newPage) => {
    paginationStore.currentPage = newPage;
});
</script>