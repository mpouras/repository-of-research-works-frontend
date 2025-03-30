<template>
    <div class="home-page-container">

        <div class="container-box">
            <RouteTitle> Keywords</RouteTitle>

            <div v-if="keywordsStore.errors.error">
                {{ keywordsStore.errors }}
            </div>
            
            <div v-else-if="keywordsStore.keywords.length" class="flex flex-wrap gap-2">
                <router-link
                    v-for="keyword in keywordsStore.keywords"
                    :key="keyword.id"
                    :to="{ name: 'Keyword', params: { name: keyword.name}}"
                    class="tag-badge"
                >
                    <i :class="icons.hashtag"></i>
                    <p class="tag-badge-text">{{ keyword.name }}</p>
                </router-link>

            </div>

            <div v-else>
                Not Found
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { useKeywordsStore } from '../stores/keywords';
import RouteTitle from './RouteTitle.vue';
import { getRandomColor } from '../utils/colors';
import { icons } from '../utils/icons';

const keywordsStore = useKeywordsStore();

onMounted(async () => {
   await keywordsStore.getKeywords();
});
</script>

<style scoped></style>