<template>
    <div>
        <div class="component-title-primary-md">Notifications</div>

        <hr class="my-5">

        <div class="text-normal">Manage your notification settings.</div>

        <div class="mt-10">
            <div class="mb-4 flex items-center justify-between">
                <label for="email_notifications" class="text-gray-700">Email Notifications</label>
                <Toggle v-model="form.email_notifications" id="email_notifications" @update:modelValue="logChange('Email', $event)"/>
            </div>

            <div class="mb-4 flex items-center justify-between">
                <label for="push_notifications" class="text-gray-700">Application Notifications</label>
                <Toggle v-model="form.push_notifications" id="push_notifications" @update:modelValue="logChange('Application', $event)"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Toggle from '../../../components/Toggle.vue';

const form = ref({
    email_notifications: false,
    push_notifications: false,
});

const logChange = (type, value) => {
    console.log(`${type} Notifications:`, value);
};
</script>

<style scoped></style>