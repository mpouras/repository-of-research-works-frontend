<template>
    <ul v-if="notifications.length" class="list-box">
        <li v-for="notification in notifications" :key="notification.id" 
            :class="[notification.read_at ? 'notification-box-item-read' : 'notification-box-item-unread']">
            <Disclosure v-slot="{ open }">
                <DisclosureButton 
                    @click="!notification.read_at && markAsRead(notification.id)"
                    :class="[notification.read_at ? 'notification-title-read' : 'notification-title-unread']" class="w-full text-left">
                    {{ notification.data.title }}
                </DisclosureButton>
                <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <DisclosurePanel class="pb-2 pt-4 text-sm text-gray-500">
                        <div>{{ notification.data.message }}</div>
                        <div v-if="notification.data.paragraph">{{ notification.data.paragraph }}</div>
                        <button v-if="notification.data.action_url" 
                            @click="handleAction(notification.data.action_url, notification.data.action_method)"  
                            class="secondary-button">{{ notification.data.action }}
                        </button>
                    </DisclosurePanel>
                </transition>
            </Disclosure>
        </li>
    </ul>

    <div v-else>
        No Notifications Found
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserNotificationStore } from '../stores/userNotifications';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { toast } from 'vue3-toastify';

const store = useUserNotificationStore();
const notifications = ref([]);
const errors = ref({});

onMounted(async () => {
    await store.getNotifications();
    notifications.value = store.notifications;
    errors.value = store.errors;
});

const markAsRead = async (notificationId) => {
    await store.markAsRead(notificationId);
    notifications.value = notifications.value.map(notification => {
        if (notification.id === notificationId) {
            return { ...notification, read_at: new Date() };
        }
        return notification;
    });
};

const handleAction = async (url, method = "POST") => {
    try {
        const response = await fetch(url, {
            method: method.toUpperCase(),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth-token")}` ,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (response.ok) {
            toast.success(data.message || "Action completed successfully.");
        } else {
            toast.error(data.message || "Something went wrong.");
        }
    } catch (error) {
        console.error("Error handling action:", error);
        toast.error(error.message);
    }
};
</script>
