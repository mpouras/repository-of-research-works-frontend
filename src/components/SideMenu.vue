<template>
    <aside>
        <nav class="space-y-1">
            <button 
                v-for="tab in tabs" 
                :key="tab.name" 
                @click="navigate(tab.name)" 
                :class="[
                    'w-full border-l-4 px-3 py-2 flex items-center text-sm font-medium',
                    isSelected(tab.name) 
                        ? 'bg-orange-100 border-orange-500 text-orange-700' 
                        : 'bg-white text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700'
                ]"
            >
                <i :class="[tab.icon, 'text-2xl pr-2']"></i>
                <span class="truncate">{{ tab.label }}</span>
                <span v-if="tab.badge && useUserStore().notificationsCount > 0" class="tab-notifications-badge">
                    {{ useUserStore().notificationsCount }}
                </span>
            </button>
        </nav>
    </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter();
const route = useRoute();

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    }
});

const isSelected = (tabName) => {
    const routesWithPrefix = {
        AdminUsers: '/admin/user',
        AdminPublishers: '/admin/publisher',
        AdminPublications: '/admin/publication',
        AdminArticles: '/admin/article',
        AdminKeywords: '/admin/keyword',
        AdminAuthors: '/admin/author'
    };

    if (routesWithPrefix[tabName]) {
        return route.path.startsWith(routesWithPrefix[tabName]);
    }

    return route.name === tabName;
};

const navigate = (routeName) => {
    router.push({ name: routeName });
};
</script>

<style scoped></style>