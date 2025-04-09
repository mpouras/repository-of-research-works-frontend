<template>
    <div>
        <h1 class="admin-title">Authors</h1>
        <div v-if="errors.error">
            {{ errors }}
        </div>

        
        <div class="flex flex-row justify-between items-center my-4">
            <div class="text-normal">Manage Authors</div>
            <button @click="$router.push({ name: 'AdminCreateObject' , params: { type: 'author' }})" class="primary-button">Add Authors</button>
        </div>

        <div v-if="authors.length" class="grid grid-cols-1">
            <SearchBar :onSearch="handleSearch"/>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'authors'" />
                <SortSelect :paginate="true" :sort="true" type="authors"/>
            </div>

            <div class="table-container">
                <table class="table-style">
                    <thead>
                        <tr class="bg-gray-100">
                            <th scope="col" class="table-title"> ID </th>
                            <th scope="col" class="table-title max-w-xs truncate"> Name </th>
                            <th scope="col" class="table-title"> Created At </th>
                            <th scope="col" class="table-title"> Actions </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-300">
                        <tr v-for="author in authors" :key="author.id" 
                            class="bg-white transition-all duration-500 hover:bg-gray-50" 
                        >
                            <td class="table-item"> {{ author.id }} </td>
                            <td class="table-item"> {{ author.name }}</td>
                            <td class="table-item"> {{ formatDate(author.created_at) }} </td>
                            <td class="flex p-5 items-center justify-center gap-0.5">
                                <button @click="navigateToAuthor(author.id)" class="table-button group hover:bg-orange-600">
                                    <i :class="[icons.editUser, 'text-xl text-orange-500 group-hover:text-white']"></i>
                                </button>

                                <button @click="deleteAuthor(author.id)" class="table-button group hover:bg-red-600">
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
import { useAuthorStore } from '../../stores/author';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '../../utils/dates';
import { icons } from '../../utils/icons';
import SearchBar from '../../components/SearchBar.vue';
import SortSelect from '../../components/SortSelect.vue';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { useQueryParamsStore } from '../../stores/queryParams';

const authorStore = useAuthorStore();
const route = useRoute();
const router = useRouter();
const { openModal } = useConfirmationModal();
const { queryParams } = useQueryParamsStore();

const authors = ref([]);
const errors = ref({});

const fetchAuthors = async () => {
    await authorStore.getAuthors({
        query: route.query.query || undefined,
        ...queryParams
    });
    authors.value = authorStore.authors;
    errors.value = authorStore.errors;
};

// Watch for changes after delete
watch(() => authorStore.authors, (newAuthors) => {
    authors.value = newAuthors;
}, { deep: true });

watch(queryParams, () => {
    fetchAuthors();
}, { deep: true });

onMounted(async() => {
    fetchAuthors();
});

function navigateToAuthor(id) {
    router.push({ name: 'AdminAuthor', params: { id } })
}

async function deleteAuthor(id) {
    const confirmed = await openModal();
    if (!confirmed) return;

    await authorStore.deleteAuthor(id);
}

async function handleSearch(query) {
    router.push({ query: { query: query || undefined }})
}

watch(() => route.query.query, (newQuery) => {
    if (newQuery !== undefined) {
        fetchAuthors();
    }
}, { immediate: true });
</script>