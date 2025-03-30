<template>
    <div class="page">

        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div v-else-if="author && Object.keys(author).length > 0">
            <div class="component-title-primary">{{ author.name }}</div>
            {{ author.university }}

            <div class="flex flex-col gap-1">
                <div class="component-title-tertiary">Resources</div>
                <a v-if="author.profile_link" :href="author.profile_link" target="_blank" class="link-text">
                    <i :class="icons.link"></i>
                    {{ getHostnameByUrl(author.profile_link) }}
                </a>
                <a v-if="author.orcid_link" :href="author.orcid_link" target="_blank" class="link-text">
                    <i :class="icons.link"></i>
                    {{ getHostnameByUrl(author.orcid_link) }}
                </a>
            </div>

            <div v-if="authorArticles.length">
                <RouteTitle>Articles</RouteTitle>

                <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                    <ListRange :listType="'articles'" />
                    <SortSelect :paginate="true" :sort="true" type="articles"/>
                </div>

                <ArticlesList :articles="authorArticles"/>

                <PaginationBar  @update:currentPage="handlePageChange"/>
            </div>

            <div v-else>
                Not Found
            </div>
        </div>

        <div v-else>
            Not Found
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthorStore } from '../../stores/author.js';
import { getHostnameByUrl } from '../../utils/urls.js';
import RouteTitle from '../../components/RouteTitle.vue';
import ArticlesList from '../../components/ArticlesList.vue';
import PaginationBar from '../../components/PaginationBar.vue';
import ListRange from '../../components/ListRange.vue';
import { icons } from '../../utils/icons.js';
import { useQueryParamsStore } from '../../stores/queryParams.js';
import SortSelect from '../../components/SortSelect.vue';

const route = useRoute();
const authorStore = useAuthorStore();
const { queryParams } = useQueryParamsStore();

const id = route.params.id;

const author = ref({});
const authorArticles = ref({});
const errors = ref({});

async function fetchAuthor() {
    await authorStore.getAuthor(id, queryParams);
    author.value = authorStore.author;
    authorArticles.value = authorStore.authorArticles;
    errors.value = authorStore.errors;
}

watch(queryParams, () => {
    fetchAuthor();
}, { deep: true });

onMounted(() => {
    fetchAuthor();
});
</script>

<style scoped></style>