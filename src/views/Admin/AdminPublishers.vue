<template>
    <div>
        <h1 class="admin-title">Publishers</h1>
        <div v-if="errors.error">
            {{ errors }}
        </div>

        
        <div class="flex flex-row justify-between items-center my-4">
            <div class="text-normal">Manage Publishers</div>
            <button @click="$router.push({ name: 'AdminCreateObject' , params: { type: 'publisher'}})" class="primary-button">Add Publisher</button>
        </div>

        <div v-if="publishers.length" class="grid grid-cols-1">
            <SearchBar :onSearch="handleSearch"/>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'publishers'" />
                <SortSelect :paginate="true" :sort="true" type="publishers"/>
            </div>
            
            <div class="table-container">
                <table class="table-style">
                    <thead>
                        <tr class="bg-gray-100">
                            <th scope="col" class="table-title"> ID </th>
                            <th scope="col" class="table-title"> Name </th>
                            <th scope="col" class="table-title"> Created At </th>
                            <th scope="col" class="table-title"> Actions </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-300 ">
                        <tr v-for="publisher in publishers" :key="publisher.id" 
                            class="bg-white transition-all duration-500 hover:bg-gray-50" 
                        >
                            <td class="table-item"> {{ publisher.id }} </td>
                            <td class="table-item"> {{ publisher.name }}</td>
                            <td class="table-item"> {{ formatDate(publisher.created_at) }} </td>
                            <td class="flex p-5 items-center justify-center gap-0.5">
                                <button @click="navigateToPublisher(publisher.id)" class="table-button group hover:bg-orange-600">
                                    <i :class="[icons.edit, 'text-xl text-orange-500 group-hover:text-white']"></i>
                                </button>

                                <button @click="deletePublisher(publisher.id)" class="table-button group hover:bg-red-600">
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
import { usePublisherStore } from '../../stores/publishers';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '../../utils/dates';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { icons } from '../../utils/icons';
import { useQueryParamsStore } from '../../stores/queryParams';
import SearchBar from '../../components/SearchBar.vue';
import SortSelect from '../../components/SortSelect.vue';

const publisherStore = usePublisherStore();
const router = useRouter();
const route = useRoute();
const { openModal } = useConfirmationModal();
const { queryParams } = useQueryParamsStore();

const publishers = ref({});
const errors = ref({});

const fetchPublishers = async () => {
    await publisherStore.getPublishers({
        query: route.query.query || undefined,
        ...queryParams
    });
    publishers.value = publisherStore.publishers;
    errors.value = publisherStore.errors;
};

// Watch for changes after delete
watch(() => publisherStore.publishers, (newPublishers) => {
    publishers.value = newPublishers;
}, { deep: true });

watch(queryParams, () => {
    fetchPublishers();
}, { deep: true });

onMounted(async() => {
    fetchPublishers();
});

function navigateToPublisher(id) {
    router.push({ name: 'AdminPublisher', params: { id } })
}

async function deletePublisher(id) {
    const confirmed = await openModal();
    if (!confirmed) return;

    await publisherStore.deletePublisher(id);
}

async function handleSearch(query) {
    router.push({ query: { query: query || undefined }})
}

watch(() => route.query.query, (newQuery) => {
    if (newQuery !== undefined) {
        fetchPublishers();
    }
}, { immediate: true });
</script>