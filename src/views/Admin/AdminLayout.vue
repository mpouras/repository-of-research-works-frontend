<template>
    <div class="flex min-h-screen bg-gray-100">

        <!-- Overlay for mobile -->
        <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" @click="isSidebarOpen = false"></div>

        <!-- Sticky Sidebar -->
        <aside 
            :class="{ 
                'hidden md:flex': !isSidebarOpen, 
                'fixed inset-0 z-50 md:relative': isSidebarOpen 
            }" 
            class="w-64 bg-white shadow-md md:sticky md:top-0 md:self-start md:h-screen flex flex-col"
        >
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between p-4 border-b">
                <h1 class="text-2xl font-bold">Menu</h1>

                <button class="md:hidden" @click="isSidebarOpen = false">
                    <i :class="icons.close"></i>
                </button>
            </div>

            <!-- Side Menu (Scrollable) -->
            <div class="flex-1 overflow-y-auto">
                <SideMenu :tabs="menuItems" @navigate="isSidebarOpen = false" />
            </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 flex flex-col min-h-screen">
            <!-- Sticky Navbar -->
            <header class="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
                <!-- Mobile menu button -->
                <button @click="isSidebarOpen = !isSidebarOpen" class="block md:hidden">
                    <i :class="['text-2xl', icons.menu]"></i>
                </button>
                <h2 class="text-xl font-semibold">Admin</h2>
                <UserDropdownMenu />
            </header>
            
            <main class="p-6">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import UserDropdownMenu from '../../components/UserDropdownMenu.vue'
import SideMenu from '../../components/SideMenu.vue';
import { icons } from '../../utils/icons';

const isSidebarOpen = ref(false);

const menuItems = ref([
    { name: "AdminDashboard", icon: icons.dashboard, label: "Dashboard" },
    { name: "Home", icon: icons.home, label: "App Home" },
    { name: "Admin", icon: icons.admin, label: "Admin", badge: true },
    { name: "AdminUsers", icon: icons.users, label: "Users" },
    { name: "AdminPublishers", icon: icons.publishers, label: "Publishers" },
    { name: "AdminPublications", icon: icons.publications, label: "Publications" },
    { name: "AdminArticles", icon: icons.articles, label: "Articles" },
    { name: "AdminAuthors", icon: icons.authors, label: "Authors" },
    { name: "AdminKeywords", icon: icons.keywords, label: "Keywords" }
]);
</script>