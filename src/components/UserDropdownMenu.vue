<template>
    <Menu as="div" class="relative ml-3 z-10">
        <div>
            <MenuButton class="relative flex rounded-full bg-gray-800 text-sm">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <div class="relative">
                    <img class="profile-image-sm"
                        :src="userStore.user.photo || defaultUserImage"
                    />
                    <span v-if="userStore.notificationsCount > 0"
                        class="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs bg-red-500 text-white rounded-full"
                    >
                        {{ userStore.notificationsCount }}
                    </span>
                </div>
            </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">

            <MenuItems
                class="absolute right-0 z-10 mt-2 min-w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-2 shadow-lg ring-black/5 focus:outline-hidden">
                <div class="py-1">
                    <MenuItem v-slot="{ active }" disabled>
                        <p
                            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                            Signed as
                            <span class="font-semibold">{{ userStore.user?.username }}</span>
                        </p>
                    </MenuItem>
                </div>
                <div v-if="userStore.role === 'user'" class="py-1">
                    <MenuItem v-for="button in userButtons" v-slot="{ active }">
                        <button @click="navigate(button.name)" 
                            :class="['w-full text-left', active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                        >
                        <i :class="button.icon"></i>
                            {{ button.label }}
                            <span v-if="button.label === 'Notifications'">
                                <span v-if="userStore.notificationsCount > 0" 
                                    class="inline-flex items-center justify-center h-4 w-4 text-xs bg-red-500 text-white rounded-full"
                                >
                                    {{ userStore.notificationsCount }}
                                </span>
                            </span>
                        </button>
                    </MenuItem>
                </div>
                <div v-if="userStore.role === 'admin'" class="py-1">
                    <div v-if="!$route.name.includes('Admin')">
                        <MenuItem v-slot="{ active }">
                            <router-link
                                :to="{ name: 'Admin Dashboard' }"
                                :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                            >
                                <i :class="icons.dashboard"></i>
                                Dashboard
                            </router-link>
                        </MenuItem>
                    </div>

                    <div v-else>
                        <MenuItem v-slot="{ active }">
                            <router-link
                                :to="{ name: 'Home' }"
                                :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                            >
                            <i :class="icons.home"></i>
                                App Home
                            </router-link>
                        </MenuItem>
                    </div>
                </div>
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <a @click="handleLogout" 
                        class="bg-red-400 text-white hover:cursor-pointer"
                        :class="[active ? 'bg-red-600 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                    >
                        <i :class="icons.logout"></i>
                        Logout
                    </a>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useUserStore } from '../stores/user';
import { useAuthStore } from '../stores/auth';
import { icons } from '../utils/icons';
import defaultUserImage from '@/assets/default-user.png'

const userStore = useUserStore();

const { logout } = useAuthStore();
const router = useRouter();

const userButtons = ref([
    { icon: icons.account, label: "Account", name: "User Profile" },
    { icon: icons.notification, label: "Notifications", name: "User Notifications" },
    { icon: icons.library, label: "My Library", name: "User Library" },
    { icon: icons.settings, label: "Settings", name: "User Settings" }
]);

const navigate = (routeName) => {
    router.push({ name: routeName });
};

async function handleLogout() {
    await logout();
}
</script>