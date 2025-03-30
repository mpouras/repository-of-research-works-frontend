<template>
    <div>
        <AdminObjectsSyncForm :type="props.type" :schema="schema" :onSubmit="attachItem" />
        
        <section class="flex flex-wrap items-center gap-2">
            <div v-for="(result, index) in Object.values(selectedItems)" :key="result.id"
                class="relative inline-flex gap-2 items-start border-2 border-gray-500 bg-white px-4 py-2 rounded-md text-sm my-2 mr-2">
                <div class="flex flex-col">
                    <div><span class="font-thin">ID:</span> {{ result.id }}</div>
                    <div><span class="font-thin">Name:</span> {{ result.name }}</div>
                </div>
                <i @click="detachItem(result.id)" :class="[icons.close, 'cursor-pointer']"></i>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { icons } from '../utils/icons';
import { schemas } from '../forms/actions/sync';
import AdminObjectsSyncForm from './AdminObjectsSyncForm.vue';


const props = defineProps({
    modelValue: Object,
    type: String,
    placeholder: String
});

const schema = schemas[props.type];

const emit = defineEmits(["update:modelValue"]);

const selectedItems = ref({ ...props.modelValue });
const query = ref('');
const results = ref([]);
const showResults = ref(false);

const attachItem = (result) => {
    if (!selectedItems.value[result.id]) {
        selectedItems.value[result.id] = result;
        emit("update:modelValue", selectedItems.value);
    }

    query.value = '';
    results.value = [];
    showResults.value = false;
};

const detachItem = (id) => {
    delete selectedItems.value[id];
    emit("update:modelValue", selectedItems.value);
};

watch(() => props.modelValue, (newValue) => {
    selectedItems.value = { ...newValue };
});
</script>
