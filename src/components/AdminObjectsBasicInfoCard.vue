<template>
    <div class="mb-4 md:col-span-2">
        <div><span class="text-thin pr-2">ID:</span> {{ object?.id }}</div>
        <div><span class="text-thin pr-2">Created At:</span> {{ formatDateTime(object?.created_at) }}</div>
        <div><span class="text-thin pr-2">Last Update:</span> {{ formatDateTime(object?.updated_at) }}</div>
    </div> 
</template>

<script setup>
import { formatDateTime } from '../utils/dates';

defineProps({
    object: Object,
});
</script>

<style scoped>

</style>