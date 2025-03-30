<template>
    <div class="home-page-container">

        <div class="container-box">
            <div class="w-full">
                <RouteTitle> Latest Articles </RouteTitle>

                <div v-if="errors.error">
                    {{ errors }}
                </div>

                <div v-else-if="articles.length">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                        <div v-for="article in articles"
                            :key="article.id"
                            class="p-4 flex flex-col justify-between gap-2 border rounded-lg shadow-md bg-white"
                        >
                            <router-link 
                                :to="{ name: 'Article', params: { publicationId: article.publication.id, volumeNumber: article.volume.number, issueName: article.issue.name, articleId: article.id } }"
                                class="component-title-secondary-sm" 
                            >
                                {{ article.title }}
                            </router-link>

                            <div class="text-xs text-gray-400">
                                <i :class="icons.publications"></i>
                                {{ article.publication.title }}
                                <span>&middot</span>
                                Vol. {{ article.volume.number }}
                                <span>&middot</span>
                                Iss. {{ article.issue.name }}
                            </div>

                            <hr>
                            
                            <div class="flex flex-wrap gap-2 text-sm">
                                <i :class="icons.authorsFilled"></i>
                                <a 
                                    v-for="author in article.authors" 
                                    class="px-2 py-0.5 rounded-md bg-gray-200">
                                    {{ author.name }}
                                </a>
                            </div>

                            <p class="text-gray-800 text-sm line-clamp-3">
                                {{ article.description }}
                            </p>

                            <div class="flex flex-col md:flex-row items-center justify-between text-xs">
                                <p class="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-gray-600">
                                    Published date: {{ formatDate(article.published_date) }}
                                </p>
                                
                                <router-link 
                                    :to="{ name: 'Article', params: { publicationId: article.publication.id, volumeNumber: article.volume.number, issueName: article.issue.name, articleId: article.id } }"
                                    class="primary-button w-full md:w-auto "
                                >
                                    Read more
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <router-link
                        :to="{ name: 'ArticlesLatest' }"
                        class="secondary-button-wide"
                    >
                        See more articles...
                    </router-link>
                    
                </div>

                <div v-else>
                    Not Found
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useArticleStore } from '../stores/articles';
import { formatDate } from '../utils/dates';
import RouteTitle from './RouteTitle.vue';
import { icons } from '../utils/icons';

const articleStore = useArticleStore();
const articles = ref({});
const errors = ref({});

const fetchArticles = async () => {
    await articleStore.getAllArticles({sort_by: 'published_date', sort_order: 'desc', per_page: 10});
    articles.value = articleStore.articles;
    errors.value = articleStore.errors;
};

onMounted(() => {
    fetchArticles();
});
</script>

<style scoped></style>