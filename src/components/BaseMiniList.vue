<template>
    <div class="mini-list-container">
        <div class="mini-list-title-container">
            <h2 class="mini-list-title">
                <i :class="icon"></i>
                <span class="cursor-pointer" @click="navigateObject"> 
                    {{ title }}
                </span>
            </h2>
        </div>

        <ul class="mini-list-item-container">
            <li v-for="item in items" :key="item.id" class="mini-list-item"
                @click="navigateItem(item)"
            >
                <span class="text-gray-700 font-medium mr-4">{{ item.id }}</span>
                <div class="flex-1">
                    <p class="text-gray-600">{{ item.username || item.name || item.title }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    icon: String,
    items: Array,
    navigateObject: Function,
    navigateItem: Function
});
</script>
