<template>
    <div class="list-box">
        <div v-for="article in articles" :key="article.id" class="list-box-item">

            <div class="flex flex-row justify-between">
                <router-link 
                    :to="{ name: 'Article', params: { publicationId: article.publication.id, volumeNumber: article.volume.number, issueName: article.issue.name, articleId: article.id } }" 
                    class="component-title-secondary-md "
                >
                    {{ article.title }}
                </router-link>

                <div class="flex flex-col md:flex-row items-center">
                    <ArticleToggleLibrary v-if="userStore.role === 'user'" :articleId="article.id"/>

                    <a v-if="article.pdf_link" :href="article.pdf_link" target="_blank"
                        class="text-red-500 hover:text-red-200">
                        <i :class="[icons.pdf, 'text-3xl md:text-4xl']"></i>
                    </a>
                </div>
                
            </div>

            <div class="text-sm text-gray-400">
                <i :class="icons.publications"></i>
                {{ article.publication.title }}
                <span>&middot;</span>
                Vol. {{ article.volume.number }}
                <span>&middot;</span>
                Iss. {{ article.issue.name }}
            </div>

            <div class="flex flex-col md:flex-row gap-2 md:items-center text-xs text-gray-600">
                <div class="flex flex-wrap gap-2 items-center">
                    <i :class="[icons.authorsFilled, 'mdi-18px']"></i>
                    <a v-for="author in article.authors" class="px-2 py-0.5 rounded-md text-sm font-semibold bg-gray-200">
                        {{ author.name }}
                    </a>
                </div>

                <div class="hidden md:block">&middot;</div>

                <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray">Date Published</span>
                    <p class="px-2 py-0.5 rounded-md text-sm font-semibold bg-orange-100">
                        {{ formatDate(article.published_date) }}
                    </p>
                </div>
            </div>

            <div>
                <p class="text-gray-800 text-md line-clamp-3">
                    {{ article.description }}
                </p>
            </div>
            <router-link 
                :to="{ name: 'Article', params: { publicationId: article.publication.id, volumeNumber: article.volume.number, issueName: article.issue.name, articleId: article.id } }" 
                class="primary-button-wide"
            >
                Read more
            </router-link>
            
        </div>
    </div>
</template>

<script setup>
import { formatDate } from '../utils/dates';
import { onMounted } from "vue";
import { useUserLibraryStore } from '../stores/userLibrary'
import ArticleToggleLibrary from './ArticleToggleLibrary.vue';
import { useUserStore } from '../stores/user';
import { icons } from '../utils/icons';

const userStore = useUserStore();
const userLibraryStore = useUserLibraryStore();

const props = defineProps(['articles']);

onMounted(async () => {
    await userLibraryStore.userLibrary();
});
</script>

<style scoped></style>