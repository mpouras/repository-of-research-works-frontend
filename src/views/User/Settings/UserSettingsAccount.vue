<template>
    <div>
        <div class="component-title-primary-md">Account</div>

        <hr class="my-5">

        <div class="flex flex-col">
            <div>
                <span class="text-thin pr-2">ID </span>
                {{ userStore.user.id }}
            </div>
            <div>
                <span class="text-thin pr-2">Name </span>
                {{ userStore.user.first_name }} {{ userStore.user.last_name }}
            </div>
            <div>
                <span class="text-thin pr-2">Created At </span>
                {{ formatDate(userStore.user.created_at) }}
            </div>
        </div>

        <hr class="my-5">

        <div>
            <div class="component-title my-5">Deactivate Account</div>
            <div class="text-normal">
                Deactivating your account will disable your account. You can reactivate your account within 30 days.
            </div>
            <button class="primary-button-wide" @click="handleDeactivateAccount">Deactivate Account</button>
        </div>

        <hr class="my-5">

        <div>
            <div class="component-title my-5">Delete Account</div>
            <div class="text-normal">
                Deleting your account is irreversible. All your data will be lost.
            </div>
            <button class="danger-button-wide" @click="handleDeleteAccount">Delete Account</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../../stores/user';
import { formatDate } from '../../../utils/dates';
import { useVerificationModal } from '../../../composables/useVerificationModal';
import { modalValidationRules } from '../../../forms/validations/userAccountActionsRules';

const userStore = useUserStore();
const { openModal } = useVerificationModal();

onMounted(async () => {
    userStore.user;
});

async function handleDeactivateAccount() {
    const confirmationInput = await openModal([
        { name: 'email', type: 'email', validators: modalValidationRules.email },
        { name: 'password', type: 'password', validators: modalValidationRules.password },
    ]);

    if (!confirmationInput) return;

    await userStore.deactivateUser(confirmationInput);
}

async function handleDeleteAccount() {
    const confirmationInput = await openModal([
        { name: 'email', type: 'email', validators: modalValidationRules.email },
        { name: 'password', type: 'password', validators: modalValidationRules.password },
    ]);
    if (!confirmationInput) return;

    await userStore.deleteUser(confirmationInput);
}
</script>

<style scoped></style>