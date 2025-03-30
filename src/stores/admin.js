import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { authToken } from "../utils/token";
import { useToastStore } from "./toasts";
import { buildApiQueryParams, handleApiErrors } from "../utils/api";
import { usePaginationStore } from "./pagination";

const { showLoading, hideLoading } = useGlobalLoading();

export const useAdminStore = defineStore("adminStore", {
    state: () => {
        return {
            users: {},
            user: {},
            dashboard: {},
            errors: {},
        };
    },

    actions: {

        setUser(data) {
            this.errors = {};
            this.user = data;
        },

        setUsers(data) {
            this.errors = {};
            this.users = data;
        },

        setDashboard(data) {
            this.errors = {};
            this.dashboard = data;
        },

        clearUser() {
            this.user = {};
        },

        clearUsers() {
            this.users = {};
        },

        clearDashboard() {
            this.dashboard = {};
        },

        async getDashboard() {
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/admin/dashboard`, {
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }
                    
                    this.setDashboard(data);
                } catch (error) {
                    this.clearDashboard();
                    this.errors = { error: "Unable to connect to the server. Please try again later." };
                }
            }
        },

        async getUsers(params) {
            const queryParams = buildApiQueryParams(params);
            
            showLoading("Loading Users...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/admin/users${queryParams}`, {
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        this.users = {};
                        handleApiErrors(data);
                        return;
                    }

                    this.setUsers(data.data);
                    usePaginationStore().setPaginationInfo(data.meta);

                } catch (error) {
                    this.clearUsers();
                    this.errors = { error: "Unable to connect to the server. Please try again later." };
                } finally {
                    hideLoading();
                }
            }
        },

        async getUser(userId) {
            showLoading("Loading User...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/admin/users/${userId}`, {
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        this.user = {};
                        handleApiErrors(data);
                        return;
                    }

                    this.setUser(data.data);

                } catch (error) {
                    this.clearUser();
                    this.errors = { error: "Unable to connect to the server. Please try again later." };
                } finally {
                    hideLoading();
                }
            }
        },

        async updateUser(userData, userId) {
            showLoading("Updating User...");
            this.errors = {};

            console.log(userData)

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/admin/update-user/${userId}`, {
                        method: 'PUT',
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

                    this.setUser(data.data);

                    useToastStore().showInstantToast(data.message);

                } catch (error) {
                    useToastStore().showInstantToast(error.message, 'error');
                    this.errors = { error: "Unable to connect to the server. Please try again later." };
                } finally {
                    hideLoading();
                }
            }
        },

        async deleteUser(userId) {
            showLoading("Deleting User...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/admin/delete-user/${userId}`, {
                        method: 'DELETE',
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
                    this.clearUser();

                    useToastStore().setToast(data.message, 'danger');
                    
                    await this.getUsers();
                    this.router.push({ name: 'AdminUsers' });
                    
                } catch (error) {
                    useToastStore().showInstantToast(error.message, 'error');
                    this.errors = { error: "Unable to connect to the server. Please try again later." };
                } finally {
                    hideLoading();
                }
            }
        }
    }
});