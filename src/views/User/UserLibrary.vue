<template>
    <div class="page">
        <RouteTitle>My Library</RouteTitle>

        <div class="text-thin">{{ userLibrary.length ? userLibrary.length : 'No' }} articles in your library</div>

        <ArticlesList v-if="userLibrary.length" :articles="userLibrary.map(item => item.article)" />

        <div v-else class="list-box list-box-item">
            <p class="text-center">Your library is empty.</p>
            <div class="items-center justify-center flex gap-4 mt-4">
                <button class="primary-button">
                    <router-link :to="{ name: 'Home' }">Back to Home</router-link>
                </button>
                <button class="secondary-button">
                    <router-link :to="{ name: 'ArticlesLatest' }">Discover Articles</router-link>
                </button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useUserLibraryStore } from '../../stores/userLibrary';
import RouteTitle from '../../components/RouteTitle.vue';
import ArticlesList from '../../components/ArticlesList.vue';

const userLibraryStore = useUserLibraryStore();

const userLibrary = ref({});

const fetchLibraryItems = async () => {
    await userLibraryStore.userLibrary();
    userLibrary.value = userLibraryStore.libraryItems;
}

onMounted(() => {
    fetchLibraryItems();
})

watchEffect(() => {
    userLibrary.value = userLibraryStore.libraryItems;
});
</script>

<style scoped>

</style>