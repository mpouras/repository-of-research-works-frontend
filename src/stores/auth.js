import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { useUserStore } from "./user";
import { useToastStore } from "./toasts";
import { authToken, removeToken, setToken } from "../utils/token";
import { handleApiErrors } from "../utils/api";

const { showLoading, hideLoading } = useGlobalLoading();

export const useAuthStore = defineStore("authStore", {

    actions: {

        async authenticate(apiRoute, formData) {
            const loadingMessage = apiRoute === "register" ? 'Creating your account...' : 'Logging you in...'
            showLoading(loadingMessage);

            try {
                const response = await fetch(`/api/${apiRoute}`, {
                    method: "POST",
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    handleApiErrors(data);
                    return;
                }
                
                setToken(data.token);

                useUserStore().setUser(data.user);
                useToastStore().setToast(data.message);

                this.router.push({ name: data.user.role === 'admin' ? "Admin Dashboard" : "Home" });

            } catch (error) {
                console.log(error.message);
                this.errors = { error: "Unable to connect to the server. Please try again later." };
                useToastStore().showInstantToast(this.errors, 'error');
            } finally {
                hideLoading();
            }
            
        },

        async logout() {
            showLoading('Logging you out...');

            try {
                const response = await fetch(`/api/logout`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${authToken.value}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    handleApiErrors(data);
                    return;
                }

                removeToken();

                useUserStore().clearUser();
                useToastStore().setToast(data.message, 'info');

                this.router.push({ name: "Home" });

            } catch (error) {
                this.errors = { error: "Unable to connect to the server. Please try again later." };
                useToastStore().showInstantToast(this.errors, 'error');
            } finally {
                hideLoading();
            }
        },
        
    },
});