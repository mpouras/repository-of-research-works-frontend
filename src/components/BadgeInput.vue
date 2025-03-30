<template>
    <div>
        <input v-model="query" type="text" :placeholder="props.placeholder" class="input-field" @input="onInput" @focus="showResults = true" @blur="hideResults"/>

        <div v-if="showResults" class="absolute z-10">
            <ul v-if="Object.keys(results).length > 0" class="bg-white border border-gray-300 rounded-md p-2">
                <li v-for="result in results" 
                    :key="result.id"
                    class="cursor-pointer p-1 hover:bg-orange-100" 
                    @click="attachItem(result)"
                >
                    <div class="flex flex-row gap-5">
                        <div><span class="font-thin">ID:</span> {{ result.id }}</div>
                        <div><span class="font-thin">Name:</span> {{ result.name }}</div>
                    </div>
                </li>
            </ul>
            <ul v-else-if="Object.keys(results).length === 0 && query.length >= 1" class="bg-white border border-gray-300 rounded-md p-2">
                <li>Not Found</li>
            </ul>
        </div>

        <div class="flex flex-wrap items-center gap-2">
            <div v-if="selectedItem"
                class="relative inline-flex gap-2 items-start border-2 border-gray-500 bg-white px-4 py-2 rounded-md text-sm my-2 mr-2">
                <div class="flex flex-col">
                    <div><span class="font-thin">ID:</span> {{ selectedItem.id }}</div>
                    <div><span class="font-thin">Name:</span> {{ selectedItem.name }}</div>
                </div>
                <i @click="detachItem(selectedItem.id)" :class="[icons.close, 'cursor-pointer']"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSearchStore } from '../stores/search';
import { icons } from '../utils/icons';

const searchStore = useSearchStore();

const props = defineProps({
    modelValue: Object,
    type: String,
    placeholder: String,
    defaultValues: Object
});

const emit = defineEmits(["update:modelValue"]);

const selectedItem = ref(props.modelValue);
const query = ref('');
const results = ref([]);
const showResults = ref(false);

let timeout = null;

const onInput = () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
        if (query.value.length >= 1) {
            fetchResults();
        } else {
            results.value = [];
        }
    }, 500);
};

async function fetchResults() {
    await searchStore.searchEntities({ 
        query: query.value.trim(), 
        model: props.type,
    });
    results.value = searchStore.results;
}

const hideResults = () => {
    setTimeout(() => showResults.value = false, 100);
};

const attachItem = (result) => {
    if (!selectedItem.value) {
        selectedItem.value = result;
        emit("update:modelValue", selectedItem.value);
    }

    query.value = '';
    results.value = [];
    showResults.value = false;
};

const detachItem = () => {
    selectedItem.value = null;
    emit("update:modelValue", null);
};

watch(() => props.modelValue, (newValue) => {
    selectedItem.value = { ...newValue };
});
</script>