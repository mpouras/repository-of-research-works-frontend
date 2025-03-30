<template>
    <form>
        <div class="mb-4">
            <input v-model="query" type="text" :placeholder="props.schema.placeholder" class="input-field" @input="onInput" @focus="showResults = true" @blur="hideResults"/>

            <div v-if="showResults" class="absolute z-10">
                <ul v-if="results?.length > 0" class="bg-white border border-gray-300 rounded-md p-2">
                    <li v-for="result in results" 
                        :key="result.id"
                        class="cursor-pointer p-1 hover:bg-orange-100" 
                        @click="attachItem(result)"
                    >
                        <div class="flex flex-row gap-5">
                            <div v-for="itemKey in props.schema.itemsList" :key="itemKey">
                                <span class="font-thin uppercase">{{ itemKey }}:</span> {{ result[itemKey] }}
                            </div>
                        </div>
                    </li>
                </ul>
                <ul v-else-if="results?.length === 0 && query.length >= 1" class="bg-white border border-gray-300 rounded-md p-2">
                    <li>Not Found</li>
                </ul>
            </div>
            
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchStore } from '../stores/search';

const searchStore = useSearchStore();

const props = defineProps({
    onSubmit: Function, 
    schema: Object,
    defaultValues: Object
});

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
        model: props.schema.object,
        ...(props.defaultValues?.publication_id && { publication_id: props.defaultValues.publication_id }),
        ...(props.defaultValues?.volume_number && { volume_number: props.defaultValues.volume_number }),
        ...(props.defaultValues?.issue_name && { issue_name: props.defaultValues.issue_name })
    });
    results.value = searchStore.results;
}

const hideResults = () => {
    setTimeout(() => showResults.value = false, 100);
};

const attachItem = (result) => {
    props.onSubmit(result);

    query.value = '';
    results.value = [];
    showResults.value = false;
};
</script>