<template>
    <div>
        <div class="flex flex-row space-y-1 justify-between border-2 border-gray-500 bg-white px-4 py-2 rounded-md text-sm my-2">
            <div class="flex flex-col">
                <div><span class="font-thin">ID:</span> {{ publisher.id }}</div>
                <div><span class="font-thin">Name:</span> {{ publisher.name }}</div>
            </div>

            <BaseActionsDropdown :deleteAction="deleteAction"/>
        </div>
    </div>
</template>

<script setup>
import BaseActionsDropdown from './BaseActionsDropdown.vue';

const props = defineProps({
    object: Object,
    actions: Array
})
</script>

<style scoped>

</style>