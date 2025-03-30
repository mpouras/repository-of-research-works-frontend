<template>
    <div class="flex flex-row justify-between">
        <button class="primary-button-lg" @click="back">
            <i :class="icons.back"></i> 
            Back
        </button>

        <div>
            <button v-if="updateAction" class="secondary-button-lg mr-1" @click="updateAction">
                <i :class="icons.update"></i> 
                Update
            </button>
            <button v-if="deleteAction" class="danger-button-lg" @click="deleteAction">
                <i :class="icons.delete"></i> 
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { icons } from '../utils/icons';

const router = useRouter();

defineProps({
    updateAction: Function,
    deleteAction: Function
});

function back() {
    router.back();
}
</script>
