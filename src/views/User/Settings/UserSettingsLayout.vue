<template>
    <main class="page">
        <RouteTitle>Settings</RouteTitle>

        <div class="list-box settings-box">

            <div class="grid grid-cols-1 md:grid-cols-[200px,1fr]">
                <div class="md:border-r border-gray-200">
                    <SideMenu :tabs="tabs"/>
                </div>

                <hr class="md:hidden my-4" />

                <div class="px-2 md:px-2 min-h-[500px]">
                    <router-view />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import SideMenu from '../../../components/SideMenu.vue';
import RouteTitle from '../../../components/RouteTitle.vue';
import { icons } from '../../../utils/icons';

const tabs = ref([
    { name: 'User Settings Account', icon: icons.userAccount, label: 'Account' },
    { name: 'User Settings Password', icon: icons.userPassword, label: 'Password' },
    { name: 'User Settings Email', icon: icons.userEmail, label: 'Email' },
    { name: 'User Settings Notifications', icon: icons.userNotifications, label: 'Notifications' },
    { name: 'User Settings Help', icon: icons.help, label: 'Help' },
]);
</script>

<style scoped>

</style>