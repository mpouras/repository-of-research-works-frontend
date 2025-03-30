<template>
    <Disclosure as="nav" class="min-h-20 bg-gray-200 border-b-4 border-black" v-slot="{ open, close }">
        <div class="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">

                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2"
                        @click="open = !open"
                    >
                        <div class="block w-5 absolute left-6 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                            <span  class="block absolute h-0.5 w-7 text-black bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': open,' -translate-y-1.5': !open }"></span>
                            <span  class="block absolute  h-0.5 w-5 text-black bg-current   transform transition duration-500 ease-in-out" :class="{'opacity-0': open } "></span>
                            <span  class="block absolute  h-0.5 w-7 text-black bg-current transform  transition duration-500 ease-in-out" :class="{'-rotate-45': open, ' translate-y-1.5': !open}"></span>
                        </div>
                    </DisclosureButton>

                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex shrink-0 items-center">
                        <router-link :to="{name: 'Home'}" class="w-auto text-4xl text-black font-bold">
                            R
                        </router-link>
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex text-center items-center space-x-4">

                            <router-link v-for="button in navigationButtons"
                                :to="{ name: `${button.route}` }"
                                class="text-black text-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                            >
                                {{ button.name }}
                            </router-link>

                            <SearchBar :onSearch="handleSearch" class="hidden sm:block"/>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Profile dropdown -->
                    <UserDropdownMenu v-if="userStore.loggedIn"/>

                    <!-- Auth Links -->
                    <div v-else class="hidden sm:block">
                        <router-link 
                            :to="{ name: 'Login' }"
                            class="me-1 inline-block text-center text-sm px-4 py-2 login-button">
                            Login
                        </router-link>
                        <router-link
                            :to="{ name: 'Register' }"
                            class="me-1 inline-block text-center text-sm px-4 py-2 register-button">
                            Register
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3">

                <!-- Search bar to Mobile Menu-->
                <SearchBar :onSearch="handleSearch" />

                <!-- Auth Buttons to Mobile Menu -->
                <div v-if="!userStore.loggedIn" >
                    <router-link 
                        :to="{ name: 'Login' }"
                        @click="close"
                        class="m-2 login-button block rounded-md px-3 py-2 text-base font-medium">
                        Login
                    </router-link>
                    <router-link
                        :to="{ name: 'Register' }"
                        @click="close"
                        class="m-2 register-button block rounded-md px-3 py-2 text-base font-medium">
                        Register
                    </router-link>
                </div>

                <!-- Nav Menu main buttons for Mobile -->
                <router-link v-for="button in navigationButtons"
                    :to="{ name: `${button.route}` }"
                    @click="close"
                    class="m-2 text-black hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                    {{ button.name }}
                </router-link>

            </div>
        </DisclosurePanel>

    </Disclosure>

</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import SearchBar from '../components/SearchBar.vue';
import UserDropdownMenu from './UserDropdownMenu.vue';
import { useUserStore } from '../stores/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
    userStore.loggedIn
})

const navigationButtons = [
    { name: 'Publications', route: 'Publications'},
    { name: 'Latest Articles', route: 'ArticlesLatest'}
];

function handleSearch(query) {
    router.push({ name: 'Search', query: { query } });
}

</script>

<style></style>
