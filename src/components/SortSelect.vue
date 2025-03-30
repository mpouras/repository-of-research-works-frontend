<template>
    <div class="inline-flex items-center space-x-2 my-2">

        <div v-if="props.paginate" class="max-w-sm">
            <label class="block text-xs text-slate-600"> Per Page </label>

            <div class="relative">
                <select 
                    v-model="queryParamsStore.queryParams.per_page"
                    @change="handlePerPageChange"
                    class="select-field"
                >
                    <option v-for="option in pagination" :value="option.value">{{ option.label }}</option>
                </select>
                <i :class="[icons.sort, 'absolute top-0.5 right-1']"></i>
            </div>
        </div>

        <div v-if="props.sort" class="max-w-sm">
            <label class="block text-xs text-slate-600"> Sort Field </label>

            <div class="relative">
                <select 
                    v-model="queryParamsStore.queryParams.sort_by"
                    @change="handleSortByChange"
                    class="select-field"
                >
                    <option v-for="option in sortFields" :value="option.value">{{ option.label }}</option>
                </select>
                <i :class="[icons.sort, 'absolute top-0.5 right-1']"></i>
            </div>
        </div>

        <div v-if="props.sort" class="max-w-sm">
            <label class="block text-xs text-slate-600"> Sort Direction </label>

            <div class="relative">
                <select 
                    v-model="queryParamsStore.queryParams.sort_order"
                    @change="handleSortOrderChange"
                    class="select-field"
                > 
                    <option v-for="option in sortDirections" :value="option.value">{{ option.label }}</option>
                </select>
                <i :class="[icons.sort, 'absolute top-0.5 right-1']"></i>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue';
import { icons } from '../utils/icons';
import { sortFieldsList, sortDirectionsList, paginationOptions } from '../utils/sort';
import { useQueryParamsStore } from '../stores/queryParams';
import { useRoute } from 'vue-router';

const queryParamsStore = useQueryParamsStore();
const { route } = useRoute();

const props = defineProps({
    type: String,
    sort: Boolean,
    paginate: Boolean,
});

const sortFields = computed(() => sortFieldsList[props.type] || []);
const sortDirections = computed(() => sortDirectionsList || []);
const pagination = computed(() => paginationOptions || []);

function handleSortByChange() {
    queryParamsStore.setSortBy(queryParamsStore.queryParams.sort_by);
}

function handleSortOrderChange() {
    queryParamsStore.setSortOrder(queryParamsStore.queryParams.sort_order);
}

function handlePerPageChange() {
    queryParamsStore.setPerPage(queryParamsStore.queryParams.per_page);
}
</script>