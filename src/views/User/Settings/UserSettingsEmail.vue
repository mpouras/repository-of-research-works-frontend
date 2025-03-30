<template>
    <div>
        <div class="component-title-primary-md">Email</div>

        <hr class="my-5">

        <div class="flex flex-row items-center">
            <span class="text-thin pr-2">Your email </span>
            {{ currentEmail }}

            <Tooltip v-if="userStore.user.email_verified_at === null" text="Your email is not verified yet." position="right">
                <i class="mdi mdi-help-circle text-red-500"></i>
            </Tooltip>

            <Tooltip v-else text="Your email is verified." position="right">
                <i class="mdi mdi-check-circle text-green-500"></i>
            </Tooltip>
        </div>

        <hr class="my-5">

        <div class="component-title my-5">Change you Email Address</div>

        <div class="text-normal">Changing your email will require you to verify your new email address.</div>

        <div class="mt-10">
            <div class="mb-4">
                <label for="email" class="block text-gray-700">New Email</label>
                <input id="email" type="text" v-model="form.email" class="input-field" placeholder="Enter your new email address" />
                <div v-if="v$.email.$error" class="input-form-error">{{ v$.email.$errors[0]?.$message }}</div>
            </div>

            <div class="mb-4">
                <label for="email_confirmation" class="block text-gray-700">Confirm New Email</label>
                <input id="email_confirmation" type="text" v-model="form.email_confirmation" class="input-field" placeholder="Enter your new email address" />
                <div v-if="v$.email_confirmation.$error" class="input-form-error">{{ v$.email_confirmation.$errors[0]?.$message }}</div>
            </div>

            <button @click="handleChangeEmail" class="secondary-button-wide">Change Email</button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '../../../stores/user';
import { useVerificationModal } from '../../../composables/useVerificationModal';
import Tooltip from '../../../components/Tooltip.vue';
import { modalValidationRules, userChangeEmailRules } from '../../../forms/validations/userChangeEmailRules';

const userStore = useUserStore();
const { openModal } = useVerificationModal();

const form = reactive({
    email: '',
    email_confirmation: '',
    password: '',
});

const currentEmail = ref(null);

onMounted(() => currentEmail.value = userStore.user.email);

watch(() => userStore.user.email, (newEmail) => {
    currentEmail.value = newEmail;
});

const rules = computed(() => {
    return userChangeEmailRules(form, userStore.user.email);
});

const v$ = useVuelidate(rules, form);

async function handleChangeEmail() {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    const userInput = await openModal([
        { name: 'password', type: 'password', validators: modalValidationRules.password },
    ]);
    if (!userInput) return;

    form.password = userInput.password;

    await userStore.changeEmail(form);
};
</script>

<style scoped>

</style>