<template>
    <div class="page">
        
        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div v-else>
            <div class="component-title-primary">{{ publication.title }}</div>

            <RouteTitle>
                Volume {{ volumeNumber }}
                &middot;
                Issue {{ issueName }}
            </RouteTitle>

            <div v-if="articles">
                <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                    <ListRange :listType="'articles'" />
                    <SortSelect :paginate="true" type="articles"/>
                </div>

                <ArticlesList :articles="articles"/>

                <PaginationBar />
            </div>

            <div v-else>
                No articles
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useRoute, useRouter } from "vue-router";
import RouteTitle from "../../components/RouteTitle.vue";
import PaginationBar from "../../components/PaginationBar.vue";
import ArticlesList from "../../components/ArticlesList.vue";
import ListRange from "../../components/ListRange.vue";
import SortSelect from "../../components/SortSelect.vue";
import { useQueryParamsStore } from "../../stores/queryParams";

const articleStore = useArticleStore();
const route = useRoute();
const router = useRouter();
const { queryParams } = useQueryParamsStore();

const publication = ref({});
const articles = ref([]);
const errors = ref({});

const publicationId = route.params.publicationId;
const volumeNumber = route.params.volumeNumber;
const issueName = route.params.issueName;

const fetchArticles = async () => {
    await articleStore.getArticles(publicationId, volumeNumber, issueName, queryParams);
    publication.value = articleStore.publication;
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

<style scoped>

</style>