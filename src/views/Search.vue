<template>
    <div class="page">
        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div v-else-if="results">
            <RouteTitle> Search Results for: {{ query }} </RouteTitle>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'results'" />
                <SortSelect :paginate="true" :sort="true" type="articles"/>
            </div>
            
            <div v-if="results.length">
                <ArticlesList v-if="results" :articles="results"/>
            
                <PaginationBar />
            </div>
            
            <div v-else>
                Not Found
            </div>
        </div>

        
    </div>
</template>

<script setup>
import { watch, onMounted, ref } from 'vue';
import { useSearchStore } from '../stores/search';
import { useRoute, useRouter } from 'vue-router';
import ArticlesList from '../components/ArticlesList.vue';
import PaginationBar from '../components/PaginationBar.vue';
import RouteTitle from '../components/RouteTitle.vue';
import ListRange from '../components/ListRange.vue';
import { useQueryParamsStore } from '../stores/queryParams';
import SortSelect from '../components/SortSelect.vue';

const props = defineProps({
    query: String
});

const searchStore = useSearchStore();
const route = useRoute();
const router = useRouter();
const { queryParams } = useQueryParamsStore();

const results = ref({});
const errors = ref({});

const fetchSearchResults = async () => {
    if (!props.query || props.query.length < 3) return;

    await searchStore.search({
        query: props.query, 
        model: 'article',
        ...queryParams,
    });
    results.value = searchStore.results;
    errors.value = searchStore.errors;
};

watch(queryParams, () => {
    fetchSearchResults();
}, { deep: true });

watch(() => props.query, (newQuery) => {
    if (!newQuery || newQuery.length < 3) return;
    fetchSearchResults();
});

onMounted(() => {
    fetchSearchResults();
});
</script>