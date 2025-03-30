import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { toast } from "vue3-toastify";
import { authToken } from "../utils/token";

const { showLoading, hideLoading } = useGlobalLoading();

export const useUserNotificationStore = defineStore("userNotificationStore", {

    state: () => {
        return {
            notifications: [],
            errors: {},
        };
    },

    actions: {

        async getNotifications() {
            showLoading('Fetching notifications');
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`http://localhost/api/user/notifications`, {
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.notifications = data.data;

                } catch (error) {
                    this.errors = { error: "Unable to connect to the server. Please try again later." };
                } finally {
                    hideLoading();
                }
            }
        },

        async markAsRead(notificationId) {
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/user/notifications/${notificationId}/read`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.notifications = data.data;

                } catch (error) {
                    this.errors = { error: "Unable to connect to the server. Please try again later." };
                }
            }
        }
    },
});