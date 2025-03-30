<template>
    <div>
        <h1 class="admin-title">Keywords</h1>
        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div class="flex flex-row justify-between items-center my-4">
            <div class="text-normal">Manage Keywords</div>
            <button @click="$router.push({ name: 'AdminCreateObject' , params: { type: 'keyword' }})" class="primary-button">Add Keyword</button>
        </div>

        <div v-if="keywords.length" class="grid grid-cols-1">
            <SearchBar :onSearch="handleSearch"/>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'keywords'" />
                <SortSelect :paginate="true" :sort="true" type="keywords"/>
            </div>

            <div class="table-container">
                <table class="table-style">
                    <thead>
                        <tr class="bg-gray-100">
                            <th scope="col" class="table-title"> ID </th>
                            <th scope="col" class="table-title"> Name </th>
                            <th scope="col" class="table-title"> Articles Count </th>
                            <th scope="col" class="table-title"> Created At </th>
                            <th scope="col" class="table-title"> Actions </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-300">
                        <tr v-for="keyword in keywords" :key="keyword.id" 
                            class="bg-white transition-all duration-500 hover:bg-gray-50" 
                        >
                            <td class="table-item"> {{ keyword.id }} </td>
                            <td class="table-item">
                                <span v-if="editingKeyword !== keyword.id">{{ keyword.name }}</span>
                                <input v-else v-model="keyword.name" type="text" class="input-field"/>
                            </td>
                            <td class="table-item"> {{ keyword.articles_count }}</td>
                            <td class="table-item"> {{ formatDate(keyword.created_at) }} </td>
                            <td class="flex p-5 items-center justify-center gap-0.5">
                                <button @click="toggleEdit(keyword.id)" class="table-button group hover:bg-orange-600">
                                    <i v-if="editingKeyword !== keyword.id" :class="[icons.edit, 'text-xl text-orange-500 group-hover:text-white']"></i>
                                    <i v-else :class="[icons.close, 'text-xl text-orange-500 group-hover:text-white']"></i>
                                </button>

                                <button v-if="editingKeyword === keyword.id" @click="updateKeyword(keyword.name, keyword.id)" class="table-button group hover:bg-gray-600">
                                    <i :class="[icons.save, 'text-xl text-gray-500 group-hover:text-white']"></i>
                                </button>

                                <button @click="deleteKeyword(keyword.name)" class="table-button group hover:bg-red-600">
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
import { useKeywordsStore } from '../../stores/keywords';
import { onMounted, reactive, ref, watch } from 'vue';
import { formatDate } from '../../utils/dates';
import { icons } from '../../utils/icons';
import ListRange from '../../components/ListRange.vue';
import PaginationBar from '../../components/PaginationBar.vue';
import SearchBar from '../../components/SearchBar.vue';
import SortSelect from '../../components/SortSelect.vue';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { useQueryParamsStore } from '../../stores/queryParams';
import { useRoute, useRouter } from 'vue-router';

const keywordStore = useKeywordsStore();
const route = useRoute();
const router = useRouter();
const { openModal } = useConfirmationModal();
const { queryParams } = useQueryParamsStore();

const keywords = ref([]);
const errors = ref({});
const isEdit = ref(false);
const editingKeyword = ref(null);

const fetchKeywords = async () => {
    await keywordStore.getKeywords({
        query: route.query.query || undefined,
        ...queryParams
    });
    keywords.value = keywordStore.keywords;
    errors.value = keywordStore.errors;
};

// Watch for changes after delete
watch(() => keywordStore.keywords, (newKeywords) => {
    keywords.value = newKeywords;
}, { deep: true });

watch(queryParams, () => {
    fetchKeywords();
}, { deep: true });

onMounted(async() => {
    fetchKeywords();
});

function toggleEdit(id) {
    if (editingKeyword.value === id) {
        editingKeyword.value = null;
        isEdit.value = false;
    } else {
        editingKeyword.value = id;
        isEdit.value = true;
    }
}

async function updateKeyword(data, id) {
    const formData = { name: data };
    await keywordStore.updateKeyword(formData, id);
    toggleEdit(id);
}

async function deleteKeyword(name) {
    const confirmed = await openModal();
    if (!confirmed) return;

    await keywordStore.deleteKeyword(name);
}

async function handleSearch(query) {
    router.push({ query: { query: query || undefined }})
}

watch(() => route.query.query, (newQuery) => {
    if (newQuery !== undefined) {
        fetchKeywords();
    }
}, { immediate: true });
</script>