<template>

    <div class="flex items-center justify-center min-h-screen pt-10 pb-10 bg-gradient-to-tr from-green-50 via-green-100 to-green-300">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
            <h2 class="text-3xl font-bold mb-10 text-center text-gray-800">Create an Account</h2>

            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="first_name" class="block text-gray-700">First Name</label>
                    <input id="first_name" type="text" v-model="form.first_name"
                        class="input-field"
                        placeholder="Enter your first name" />
                    <div v-if="v$.first_name.$error" class="input-form-error">
                        {{ v$.first_name.$errors[0]?.$message }}
                    </div>
                </div>

                <div class="mb-4">
                    <label for="last_name" class="block text-gray-700">Last Name</label>
                    <input id="last_name" type="text" v-model="form.last_name"
                        class="input-field"
                        placeholder="Enter your last name" />
                    <div v-if="v$.last_name.$error" class="input-form-error">
                        {{ v$.last_name.$errors[0]?.$message }}
                    </div>
                </div>

                <div class="mb-4">
                    <label for="username" class="block text-gray-700">Username</label>
                    <input id="username" type="text" v-model="form.username"
                        class="input-field"
                        placeholder="Enter your username" />
                    <div v-if="v$.username.$error" class="input-form-error">
                        {{ v$.username.$errors[0]?.$message }}
                    </div>
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-700">Email</label>
                    <input id="email" type="email" v-model="form.email"
                        class="input-field"
                        placeholder="Enter your email" />
                    <div v-if="v$.email.$error" class="input-form-error">
                        {{ v$.email.$errors[0]?.$message }} 
                    </div>
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-gray-700">Password</label>
                    <input id="password" type="password" v-model="form.password"
                        class="input-field"
                        placeholder="Enter your password" />
                    <div v-if="v$.password.$error" class="input-form-error">
                        {{ v$.password.$errors[0]?.$message }}
                    </div>  
                </div>

                <div class="mb-6">
                    <label for="password_confirmation" class="block text-gray-700">Confirm Password</label>
                    <input id="password_confirmation" type="password" v-model="form.password_confirmation"
                        class="input-field"
                        placeholder="Confirm your password" />
                    <div v-if="v$.password_confirmation.$error" class="input-form-error">
                        {{ v$.password_confirmation.$errors[0]?.$message }}
                    </div>
                </div>

                <button type="submit" class="register-button-wide">
                    Register
                </button>
            </form>

            <div class="mt-4 text-center">
                <p class="text-gray-600 text-sm">Already have an account? 
                    <router-link :to="{ name: 'Login' }"
                        class="text-blue-600 hover:text-blue-800">Login
                    </router-link>
                </p>
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, reactive } from 'vue';
import { useAuthStore } from '../../stores/auth.js';
import useVuelidate from '@vuelidate/core';
import { registerRules } from '../../forms/validations/registerRules.js';

const { authenticate } = useAuthStore();

const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
});


const rules = computed(() => {
    return registerRules(form);
});

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
    const result = await v$.value.$validate();
    if (!result) return; 
    
    await authenticate('register', form);
}
</script>

<style scoped></style>