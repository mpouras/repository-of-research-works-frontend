<template>
    <div>
        <h1 class="admin-title">Publications</h1>
        <div v-if="errors.error">
            {{ errors }}
        </div>

        
        <div class="flex flex-row justify-between items-center my-4">
            <div class="text-normal">Manage Publications</div>
            <button @click="$router.push({ name: 'AdminCreateObject' , params: { type: 'publication'}})" class="primary-button">Add Publication</button>
        </div>

        <div v-if="publications.length" class="grid grid-cols-1">
            <SearchBar :onSearch="handleSearch"/>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'publications'" />
                <SortSelect :paginate="true" :sort="true" type="publications"/>
            </div>

            <div class="table-container">
                <table class="table-style">
                    <thead>
                        <tr class="bg-gray-100">
                            <th scope="col" class="table-title"> ID </th>
                            <th scope="col" class="table-title"> Title </th>
                            <th scope="col" class="table-title"> Type </th>
                            <th scope="col" class="table-title"> Publication Date </th>
                            <th scope="col" class="table-title"> Created At </th>
                            <th scope="col" class="table-title"> Actions </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-300 ">
                        <tr v-for="publication in publications" :key="publication.id" 
                            class="bg-white transition-all duration-500 hover:bg-gray-50" 
                        >
                            <td class="table-item"> {{ publication.id }} </td>
                            <td class="table-item"> {{ publication.title }}</td>
                            <td class="table-item"> {{ publication.type }}</td>
                            <td class="table-item"> {{ publication.year_published }}</td>
                            <td class="table-item"> {{ formatDate(publication.created_at) }} </td>
                            <td class="flex p-5 items-center justify-center gap-0.5">
                                <button @click="navigateToPublication(publication.id)" class="table-button group hover:bg-orange-600">
                                    <i :class="[icons.edit, 'text-xl text-orange-500 group-hover:text-white']"></i>
                                </button>

                                <button @click="deletePublication(publication.id)" class="table-button group hover:bg-red-600">
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
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { usePublicationStore } from '../../stores/publications';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '../../utils/dates';
import { icons } from '../../utils/icons';
import SearchBar from '../../components/SearchBar.vue';
import SortSelect from '../../components/SortSelect.vue';
import { useQueryParamsStore } from '../../stores/queryParams';

const publicationStore = usePublicationStore();
const route = useRoute();
const router = useRouter();
const { openModal } = useConfirmationModal();
const {queryParams} = useQueryParamsStore();

const publications = ref([]);
const errors = ref({});

const fetchPublications = async () => {
    await publicationStore.getPublications({
        query: route.query.query || undefined,
        ...queryParams
    });
    publications.value = publicationStore.publications;
    errors.value = publicationStore.errors;
};

// Watch for changes after delete
watch(() => publicationStore.publications, (newPublications) => {
    publications.value = newPublications;
}, { deep: true });

watch(queryParams, () => {
    fetchPublications();
}, { deep: true });

onMounted(async() => {
    fetchPublications();
});

function navigateToPublication(id) {
    router.push({ name: 'AdminPublication', params: { id } })
}

async function deletePublication(id) {
    const confirmed = await openModal();
    if (!confirmed) return;

    await publicationStore.deletePublication(id);
}

async function handleSearch(query) {
    router.push({ query: { query: query || undefined }})
}

watch(() => route.query.query, (newQuery) => {
    if (newQuery !== undefined) {
        fetchPublications();
    }
}, { immediate: true });
</script>