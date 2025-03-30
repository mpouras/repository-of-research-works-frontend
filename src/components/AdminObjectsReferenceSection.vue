<template>
    <button class="primary-button capitalize">
        <i :class="icons.attach"></i>
        Attach {{ object }}
    </button>

    <AdminObjectsSyncForm :type="object" :schema="schema" :onSubmit="attachObjectItem"/>

    <div v-for="item in props.objectList"
        :class="schema.style === 'default' 
            ? 'flex flex-row space-y-1 justify-between border-2 border-gray-500 bg-white px-4 py-2 rounded-md text-sm my-2'
            : 'tag-badge' 
        ">

        <div class="flex flex-col">
            <div v-for="itemKey in schema.itemsList" :key="itemKey">
                <div v-if="schema.style === 'default'">
                    <span  class="font-thin uppercase">{{ itemKey }}:</span> {{ item[itemKey] }}
                </div>

                <div v-else>
                    <div class="tag-badge-text"> {{ item[itemKey] }}</div>
                </div>
            </div>
        </div>

        <BaseActionsDropdown v-if="schema.style === 'default'" :detachAction="() => detachObjectItem(item)"/>
        
        <i v-else :class="[icons.close, 'cursor-pointer']" @click="() => detachObjectItem(item)"></i>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { icons } from '../utils/icons';
import { sync, schemas } from '../forms/actions/sync';
import AdminObjectsSyncForm from './AdminObjectsSyncForm.vue';
import BaseActionsDropdown from './BaseActionsDropdown.vue';

const route = useRoute();

const props = defineProps({
    object: String,
    objectList: Object,
});

const schema = schemas[props.object];

const id = route.params.id;

const emit = defineEmits(['refresh']);

async function attachObjectItem(result) {
    const data = schemas[props.object].data(result); 
    await sync[props.object](data, id, 'attach');
    emit('refresh');
}

async function detachObjectItem(result) {
    const data = schemas[props.object].data(result); 
    await sync[props.object](data, id, 'detach');
    emit('refresh');
}
</script>