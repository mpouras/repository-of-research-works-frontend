<template>
    <div class="page">
        <div v-if="errors.message">
            <p>Error: {{ errors.message }}</p>
        </div>

        <div v-else-if="articles">
            <TitleRoute> Latest Articles </TitleRoute>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'articles'" />
                <SortSelect :paginate="true" type="articles"/>
            </div>
            
            <ArticlesList :articles="articles"/>

            <PaginationBar @update:currentPage="handlePageChange" />
        </div>

        <div v-else>
            Not Found
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useArticleStore } from "@/stores/articles";
import TitleRoute from "../../components/RouteTitle.vue";
import PaginationBar from "../../components/PaginationBar.vue";
import ArticlesList from "../../components/ArticlesList.vue";
import ListRange from "../../components/ListRange.vue";
import { useQueryParamsStore } from "../../stores/queryParams";
import SortSelect from "../../components/SortSelect.vue";

const articleStore = useArticleStore();
const { queryParams } = useQueryParamsStore();

const articles = ref([]);
const errors = ref({});

const fetchArticles = async () => {
    await articleStore.getAllArticles(queryParams);
    articles.value = articleStore.articles;
    errors.value = articleStore.errors;
};

watch(queryParams, () => {
    fetchArticles();
}, { deep: true });

onMounted(() => {
    fetchArticles();
});

</script>
