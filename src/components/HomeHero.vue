<template>
    <div class="relative h-[500px] bg-gradient-to-tr from-gray-400 via-gray-500 to-gray-800">
        <div class="flex flex-col justify-center items-center w-full h-full px-3 md:px-0">

            <h1 class="text-4xl xl:text-6xl font-bold text-white text-center">
                Repository of Research Works
            </h1>
            <p class="text-gray-200 text-center">
                For Students, From Students
            </p>

            <div class="w-full mx-auto max-w-[720px] px-2">
                <SearchBar :onSearch="handleSearch" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import SearchBar from './SearchBar.vue';

const router = useRouter();

function handleSearch(query) {
    router.push({ name: 'Search', query: { query } });
}
</script>

<style scoped></style>