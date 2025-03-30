<template>
    <div class="flex items-center justify-center min-h-screen pt-10 pb-10 bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-300">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
            <h2 class="text-3xl font-bold mb-10 text-center text-gray-800">Login to Your Account</h2>

            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="identifier" class="block text-gray-700">Username or Email</label>
                    <input id="identifier" type="text" v-model="form.identifier" class="input-field" placeholder="Enter your username or email" />
                    <div v-if="v$.identifier.$error" class="input-form-error">
                        {{ v$.identifier.$errors[0]?.$message }}
                    </div>
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-gray-700">Password</label>
                    <input id="password" type="password" v-model="form.password" class="input-field" placeholder="Enter your password" />
                    <div v-if="v$.password.$error" class="input-form-error">
                        {{ v$.password.$errors[0]?.$message }}
                    </div>
                </div>

                <button type="submit" class="login-button-wide"> Login </button>
            </form>

            <div class="mt-4 text-center">
                <p class="text-gray-600 text-sm">Don't have an account? 
                    <router-link :to="{ name: 'Register' }"
                        class="text-blue-600 hover:text-blue-800">Register
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth";
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { loginRules } from "../../forms/validations/loginRules";

const { authenticate } = useAuthStore();

const form = reactive({
    identifier: '',
    password: ''
});

const rules = computed(() => {
    return loginRules();
});

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
    const result = await v$.value.$validate();
    if (!result) {
        return
    };
    
    await authenticate('login', form);
}
</script>

<style scoped></style>