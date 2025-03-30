<template>
    <div class="page">
        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div v-else-if="keyword && Object.keys(keyword).length > 0 ">
            <div class="component-title-primary">#{{ keyword.name }}</div>

            <RouteTitle>Articles</RouteTitle>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'articles'" />
                <SortSelect :paginate="true" :sort="true" type="articles"/>
            </div>

            <ArticlesList :articles="keywordArticles"/>

            <PaginationBar />
        </div>

        <div v-else>
            Not Found
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useKeywordsStore } from '../../stores/keywords.js';
import RouteTitle from '../../components/RouteTitle.vue';
import ArticlesList from '../../components/ArticlesList.vue';
import PaginationBar from '../../components/PaginationBar.vue';
import ListRange from '../../components/ListRange.vue';
import { useQueryParamsStore } from '../../stores/queryParams.js';
import SortSelect from '../../components/SortSelect.vue';

const route = useRoute();
const keywordStore = useKeywordsStore();
const { queryParams } = useQueryParamsStore();

const keyword = ref({});
const keywordArticles = ref({});
const errors = ref({});

const name = route.params.name;

async function fetchKeyword(name) {
    await keywordStore.getKeyword(name, queryParams);
    keyword.value = keywordStore.keywords;
    keywordArticles.value = keywordStore.keywordArticles;
    errors.value = keywordStore.errors;
}

watch(queryParams, () => {
    fetchKeyword(name);
}, { deep: true });

onMounted(() => {
    fetchKeyword(name);
});

</script>

<style scoped>

</style>