<template>
    <div class="page">
        <TabGroup>
            <TabList class="tab-container">
                <Tab v-for="(tab, index) in tabs"
                    as="template" 
                    :key="index"
                >
                    <button @click="navigate(tab.name)" :class="[isSelected(tab.name) ? 'tab-button-selected' : 'tab-button-inselected']">
                        <i :class="tab.icon"></i>
                        {{ tab.label }}
                        <span v-if="tab.name === 'User Notifications' && useUserStore().notificationsCount > 0" class="tab-notifications-badge">
                            {{ useUserStore().notificationsCount }}
                        </span>
                    </button>
                </Tab>
            </TabList>
        </TabGroup>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab } from '@headlessui/vue';
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { icons } from "../utils/icons";

const router = useRouter();
const route = useRoute();

const tabs = ref([
    { icon: icons.account, label: "Profile", name: "User Profile" },
    { icon: icons.library, label: "My Library", name: "User Library" },
    { icon: icons.settings, label: "Settings", name: "User Settings" },
    { icon: icons.notification, label: "Notifications", name: "User Notifications" }
]);

const isSelected = (tabName) => {
    return route.name.includes(tabName);
};

const navigate = (routeName) => {
    router.push({ name: routeName });
};
</script>