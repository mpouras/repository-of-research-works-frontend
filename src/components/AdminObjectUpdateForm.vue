<template>
    <form @submit.prevent="onSubmit">
        <div v-for="(field, key) in schema" :key="key" class="mb-4">
            <label :for="key" class="block text-gray-700">
                {{ field.label }}
            </label>

            <input 
                v-if="field.type === 'text' || field.type === 'email'" 
                :id="key" 
                v-model="form[key]" 
                class="input-field" 
                :placeholder="field.placeholder" 
            />

            <textarea v-else-if="field.type === 'textarea'" :id="key" v-model="form[key]" class="input-field" :placeholder="field.placeholder" rows="5" />

            <select 
                v-else-if="field.type === 'select'" 
                :id="key" 
                v-model="form[key]" 
                class="input-field"
            >
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>

            <Datepicker v-else-if="field.type === 'year-picker'"
                v-model="form[key]"
                year-picker 
                :min-date="new Date(1950, 0, 1)" 
                :max-date="new Date()"
                :auto-apply="true"
                view="year"
                :placeholder="field.placeholder"
                @on-selected="flow.value = ['month']"
            />

            <Datepicker v-else-if="field.type === 'date-picker'"
                :model-value="form[key]"
                @update:model-value="date => form[key] = date ? formatDateWithDash(date) : ''"
                date-picker 
                :min-date="new Date(1950, 0, 1)" 
                :max-date="new Date()"
                :auto-apply="true"
                :format="'dd-MM-yyyy'"
                :placeholder="field.placeholder"
            />

            <BaseBadgeInput v-else-if="field.type === 'badge-input'" 
                v-model="form[key]"
                :type="field.object"
                :placeholder="field.placeholder"
            />

            <div v-if="v$[key]?.$error" class="input-form-error">
                {{ v$[key]?.$errors[0]?.$message }}
            </div>
        </div>
    </form>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { checkFormChanges } from '../forms/helpers';
import { useToastStore } from '../stores/toasts';
import { onMounted, reactive, ref } from 'vue';
import { update } from '../forms/actions/update';
import { useRoute } from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker';
import BaseBadgeInput from './BaseBadgeInput.vue';
import { formatArticleDate, formatDateWithDash } from '../utils/dates';

const route = useRoute();
const id = route.params.id;

const props = defineProps({
    type: String,
    schema: Object,
    validationRules: Object,
    initialData: Object,
});

const form = reactive({});
const initialFormState = ref({});

onMounted(() => {
    Object.keys(props.schema).forEach(key => {
        form[key] = props.initialData[key] || ''; 
        initialFormState.value[key] = props.initialData[key] || '';
    });
});

const v$ = useVuelidate(props.validationRules, form);

async function onSubmit() {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    const updatedFields = checkFormChanges(form, initialFormState);

    if (Object.keys(updatedFields).length > 0) {
        console.log(updatedFields);
        await update[props.type](updatedFields, id);
    } else {
        useToastStore().showInstantToast("No changes detected.", 'info');
    }
};

defineExpose({
    onSubmit
});
</script>
