<template>
    <div>
        <h1 class="admin-title">Articles</h1>
        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div class="flex flex-row justify-between items-center my-4">
            <div class="text-normal">Manage Articles</div>
            <button @click="$router.push({ name: 'AdminCreateObject' , params: { type: 'article' }})" class="primary-button">Add Article</button>
        </div>

        <div v-if="articles.length" class="grid grid-cols-1">
            <SearchBar :onSearch="handleSearch"/>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'articles'" />
                <SortSelect :paginate="true" :sort="true" type="articles"/>
            </div>

            <div class="table-container">
                <table class="table-style">
                    <thead>
                        <tr class="bg-gray-100">
                            <th scope="col" class="table-title"> ID </th>
                            <th scope="col" class="table-title"> Title </th>
                            <th scope="col" class="table-title"> Publication </th>
                            <th scope="col" class="table-title"> Date Published </th>
                            <th scope="col" class="table-title"> Created At </th>
                            <th scope="col" class="table-title"> Actions </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-300">
                        <tr v-for="article in articles" :key="article.id" 
                            class="bg-white transition-all duration-500 hover:bg-gray-50" 
                        >
                            <td class="table-item"> {{ article.id }} </td>
                            <td class="table-item max-w-xs truncate"> {{ article.title }}</td>
                            <td class="table-item max-w-xs truncate"> {{ article.publication.title }}</td>
                            <td class="table-item"> {{ formatDate(article.published_date) }}</td>
                            <td class="table-item"> {{ formatDate(article.created_at) }} </td>
                            <td class="flex p-5 items-center justify-center gap-0.5">
                                <button @click="navigateToArticle(article.id)" class="table-button group hover:bg-orange-600">
                                    <i :class="[icons.edit, 'text-xl text-orange-500 group-hover:text-white']"></i>
                                </button>

                                <button @click="deleteArticle(article.id)" class="table-button group hover:bg-red-600">
                                    <i :class="[icons.delete, 'text-xl text-red-500 group-hover:text-white']"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <PaginationBar />
        </div>

        <div v-else>
            Not Found
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import ListRange from '../../components/ListRange.vue';
import PaginationBar from '../../components/PaginationBar.vue';
import { useArticleStore } from '../../stores/articles';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '../../utils/dates';
import { icons } from '../../utils/icons';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import SearchBar from '../../components/SearchBar.vue';
import SortSelect from '../../components/SortSelect.vue';
import { useQueryParamsStore } from '../../stores/queryParams';

const articleStore = useArticleStore();
const route = useRoute();
const router = useRouter();
const { openModal } = useConfirmationModal();
const { queryParams } = useQueryParamsStore();

const articles = ref([]);
const errors = ref({});

const fetchArticles = async () => {
    await articleStore.getAllArticles({
        query: route.query.query || undefined,
        ...queryParams
    });
    articles.value = articleStore.articles;
    errors.value = articleStore.errors;
};

watch(() => articleStore.articles, (newArticles) => {
    articles.value = newArticles;
}, { deep: true });

watch(queryParams, () => {
    fetchArticles();
}, { deep: true });

onMounted(async() => {
    await fetchArticles();
});

function navigateToArticle(id) {
    router.push({ name: 'AdminArticle', params: { id } });
}

async function deleteArticle(id) {
    const confirmed = await openModal();
    if (!confirmed) return;

    await articleStore.deleteArticle(id);
}

async function handleSearch(query) {
    router.push({ query: { query: query || undefined }})
}

watch(() => route.query.query, (newQuery) => {
    if (newQuery !== undefined) {
        fetchArticles();
    }
}, { immediate: true });
</script>