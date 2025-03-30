<template>
    <div>
        <h1 class="admin-title">Admin Dashboard</h1>

        <h1 class="text-xl text-center font-bold mb-4 uppercase">Stats</h1>
        <hr class="my-5">

        <div class="grid grid-cols-1 gap-5 my-4 sm:grid-cols-3">
            <div v-for="card in dashboardCards" 
                :key="card.title"
                class="card-container"
            >
                <div :class="[card.color, 'card-icon-part']">
                    <i :class="[card.icon, 'text-white text-5xl']"></i>
                </div>

                <div class="card-items-part">
                    <div v-if="card.count !== undefined">
                        <h3 class="text-sm tracking-wider">Total {{ card.title }}</h3>
                        <p class="text-3xl">{{ card.count }}</p>
                    </div>

                    <div v-if="card.weekCount !== undefined">
                        <h3 class="text-sm tracking-wider">Last Week</h3>
                        <p class="text-3xl":class="[card.weekCount > 0 ?  'text-green-500' : '']">{{ card.weekCount }}</p>
                    </div>

                    <div v-if="card.todayCount !== undefined">
                        <h3 class="text-sm tracking-wider">Today</h3>
                        <p class="text-3xl":class="[card.todayCount > 0 ? 'text-green-500' : '']">{{ card.todayCount }}</p>
                    </div>
                </div>
            </div>
        </div>

        <h1 class="text-xl text-center font-bold mb-4 uppercase">Latest</h1>
        <hr class="my-5">

        <div class="grid grid-cols-1 gap-5 my-4 sm:grid-cols-3">
            <BaseMiniList 
                v-for="card in dashboardCards" 
                :key="card.title"
                :title="`Latest ${card.title}`"
                :icon="card.icon"
                :items="card.items || []"
                :navigateObject="() => $router.push({ name: `Admin${card.title}` })"
                :navigateItem="(item) => navigateToItem(item.id, card.route)"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { useRouter } from 'vue-router';
import { icons } from '../../utils/icons';
import BaseMiniList from '../../components/BaseMiniList.vue';

const adminStore = useAdminStore();
const router = useRouter();

const dashboard = ref({});

onMounted(async () => {
    await adminStore.getDashboard();
    dashboard.value = adminStore.dashboard;

    dashboardCards.value = [
        { 
            title: "Users",
            route: 'AdminUser', 
            count: dashboard.value.users?.count, 
            weekCount: dashboard.value.users?.weekCount, 
            todayCount: dashboard.value.users?.todayCount,
            items: dashboard.value.users?.latest,
            icon: icons.users,
            color: "bg-blue-500"
        },
        { 
            title: "Publications", 
            route: 'AdminPublication',
            count: dashboard.value.publications?.count, 
            weekCount: dashboard.value.publications?.weekCount, 
            todayCount: dashboard.value.publications?.todayCount,
            items: dashboard.value.publications?.latest,
            icon: icons.publications,
            color: "bg-green-500"
        },
        { 
            title: "Publishers", 
            route: 'AdminPublisher',
            count: dashboard.value.publishers?.count, 
            weekCount: dashboard.value.publishers?.weekCount, 
            todayCount: dashboard.value.publishers?.todayCount,
            items: dashboard.value.publishers?.latest,
            icon: icons.publishers,
            color: "bg-purple-500"
        },
        { 
            title: "Articles", 
            route: 'AdminArticle',
            count: dashboard.value.articles?.count, 
            weekCount: dashboard.value.articles?.weekCount, 
            todayCount: dashboard.value.articles?.todayCount,
            items: dashboard.value.articles?.latest,
            icon: icons.articles,
            color: "bg-orange-500"
        },
        { 
            title: "Authors", 
            route: 'AdminAuthor',
            count: dashboard.value.authors?.count, 
            weekCount: dashboard.value.authors?.weekCount, 
            todayCount: dashboard.value.authors?.todayCount,
            items: dashboard.value.authors?.latest,
            icon: icons.authors,
            color: "bg-red-500"
        },
    ];
});

const dashboardCards = ref([]);

function navigateToItem(id, routeName) {
    router.push({ name: routeName, params: { id }})
}
</script>
