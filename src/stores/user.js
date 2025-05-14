import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { toast } from "vue3-toastify";
import { useToastStore } from "./toasts";
import { authToken, removeToken } from "../utils/token";
import { handleApiErrors } from "../utils/api";

const { showLoading, hideLoading } = useGlobalLoading();

export const useUserStore = defineStore("userStore", {

    state: () => {
        return {
            user: {},
            loggedIn: false,
            role: null,
            notificationsCount: 0,
            errors: {},
        };
    },

    actions: {

        setUser(data) {
            this.loggedIn = true;
            this.errors = {};
            this.user = data;
            this.role = data.role;
            this.notificationsCount = data.unread_notifications_count;
        },

        clearUser() {
            this.loggedIn = false;
            this.user = {};
            this.role = null;
            this.notificationsCount = 0;
        },

        async getUser() {
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/user`, {
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        this.clearUser();
                        handleApiErrors(data);
                        removeToken();
                        return;
                    }

                    this.setUser(data.user);

                } catch (error) {
                    this.clearUser();

                    this.errors = { error: "Unable to connect to the server. Please try again later." };

                    removeToken();
                }
            }
        },

        async updateUser(formData) {
            this.errors = {};
            showLoading('Updating user profile');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api-2/user/update-profile`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: formData
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.setUser(data.user);

                    useToastStore().setToast(data.message);

                    this.router.push({ name: "User Profile" });
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        },

        async resendVerificationEmail() {
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/email/resend`, {
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.errors = {};
                    useToastStore().showInstantToast(data.message);

                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                }
            }
        },

        async changePassword(passwordData) {
            this.errors = {};

            showLoading('Changing password...');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/user/change-password`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(passwordData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.setUser(data.user);

                    useToastStore().showInstantToast(data.message);
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        },

        async changeEmail(emailData) {
            this.errors = {};
            showLoading('Changing your email address...');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/user/change-email`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(emailData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.setUser(data.user);

                    useToastStore().showInstantToast(data.message);
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        },

        async deactivateUser(userData) {
            this.errors = {};
            showLoading('Deactivating your user account...');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/user/deactivate`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(userData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        this.authors = [];
                        handleApiErrors(data);
                        return;
                    }

                    removeToken();

                    this.clearUser();
                    useToastStore().setToast(data.message, 'info');

                    this.router.push({ name: "Home" });
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        },

        async deleteUser(userData) {
            this.errors = {};

            showLoading('Deleting your user account...');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/user/delete`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(userData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    removeToken();
    
                    this.clearUser();
                    useToastStore().setToast(data.message, 'danger');

                    this.router.push({ name: "Home" });
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        }
    }
});