<template>
    <div class="relative">
            <input  
                type="text" 
                placeholder="Search..." 
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                class="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200">

            <button type="button" @click="handleSearch">
                <i :class="[icons.search, 'text-2xl h-5 w-5 absolute top-2 right-3 fill-current']"></i>
            </button>
        </div>
</template>

<script setup>
import { ref } from 'vue';
import { icons } from '../utils/icons';

const props = defineProps({
    onSearch: Function,
});

const searchQuery = ref('');

async function handleSearch() {
    if (searchQuery.value.length > 1 && props.onSearch) {
        props.onSearch(searchQuery.value);
    }

    // searchQuery.value = '';
}
</script>