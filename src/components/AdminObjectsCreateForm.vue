<template>
    <form>
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
                v-model="form[key]"
                :format="formatArticleDate"
                :enable-time-picker="false"
                :placeholder="field.placeholder || 'Select a date'"
                :min-date="new Date(1950, 0, 1)" 
                :max-date="new Date()"
                auto-apply
                model-type="dd-MM-yyyy"
                class="custom-datepicker"
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

    <div class="inline-flex gap-2">
        <button @click="$router.back()" class="primary-button-lg">Cancel</button>
        <button @click="submitForm" class="secondary-button-lg capitalize">Create</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import Datepicker from '@vuepic/vue-datepicker';
import BaseBadgeInput from './BaseBadgeInput.vue';
import { formatArticleDate, formatDateWithDash } from '../utils/dates';

const props = defineProps({
    schema: Object,
    validationRules: Object,
    onSubmit: Function
});

const form = reactive(
    Object.fromEntries(Object.keys(props.schema).map(key => [key, '']))
);

const v$ = useVuelidate(props.validationRules, form);

async function submitForm() {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    props.onSubmit(form);
};
</script>