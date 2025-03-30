<template>
    <div>
        <div class="admin-title"> @{{ userStore.user.username}} </div>
        <div class="grid grid-cols-1 lg:grid-cols-2">
            
            <div class="list-box-item">
                <span class="admin-title-secondary">
                    <i :class="icons.notification"></i>
                    Notifications
                </span>
                <div class="h-[200px] overflow-y-auto">
                    <BaseNotificationsList />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user';
import BaseNotificationsList from '../../components/BaseNotificationsList.vue';
import { icons } from '../../utils/icons';

const userStore = useUserStore();
</script>

<style scoped>

</style>