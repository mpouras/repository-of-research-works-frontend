<template>
    <div>
        <div class="component-title-primary-md">Password</div>

        <hr class="my-5">
        
        <div class="text-normal">Changing your password regularly is a good security practice.</div>

        <form @submit.prevent="handleSubmit" class="mt-10">
            <div class="mb-4">
                <label for="current_password" class="block text-gray-700">Current Password</label>
                <input id="current_password" type="password" v-model="form.current_password" class="input-field" placeholder="Enter your Current Password" />
                <div v-if="v$.current_password.$error" class="input-form-error">{{ v$.current_password.$errors[0]?.$message }}</div>
            </div>
            
            <div class="mb-4">
                <label for="new_password" class="block text-gray-700">New Password</label>
                <input id="new_password" type="password" v-model="form.new_password" class="input-field" placeholder="Enter your New Password" />
                <div v-if="v$.new_password.$error" class="input-form-error">{{ v$.new_password.$errors[0]?.$message }}</div>
            </div>

            <div class="mb-4">
                <label for="new_password_confirmation" class="block text-gray-700">Confirm Password</label>
                <input id="new_password_confirmation" type="password" v-model="form.new_password_confirmation" class="input-field" placeholder="Confirm your New Password" />
                <div v-if="v$.new_password_confirmation.$error" class="input-form-error">{{ v$.new_password_confirmation.$errors[0]?.$message }}</div>
            </div>

            <button type="submit" class="secondary-button-wide">Change Password</button>
        </form>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '../../../stores/user';
import { userChangePasswordRules } from '../../../forms/validations/userChangePasswordRules';

const { changePassword } = useUserStore();

const form = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
});

const rules = computed(() => {
    return userChangePasswordRules(form);
});

const v$ = useVuelidate(rules, form);

function resetForm() {
    form.current_password = '';
    form.new_password = '';
    form.new_password_confirmation = '';
    v$.value.$reset();
}

async function handleSubmit() {
    const result = await v$.value.$validate();
    if (!result) return;

    await changePassword(form);
    
    resetForm();
};
</script>

<style scoped>

</style>