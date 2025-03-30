<template>
    <div class="text-thin my-4">
        <span class="component-title">Page {{ paginationStore.currentPage }} </span>
        {{ articleRange }}
    </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { usePaginationStore } from '../stores/pagination';

const paginationStore = usePaginationStore();

const props = defineProps({
    listType: String,
});

const { listType } = toRefs(props);

const articleRange = computed(() => {
    if (paginationStore.totalItems === 0) return `No ${listType.value} found`;

    const start = (paginationStore.currentPage - 1) * paginationStore.perPage + 1;
    let end = paginationStore.currentPage * paginationStore.perPage;
    if (end > paginationStore.totalItems) end = paginationStore.totalItems;

    return `Showing ${start} to ${end} of total ${paginationStore.totalItems} ${listType.value ?? ''}`;
});
</script>


<style scoped>

</style>