import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { authToken } from "../utils/token";
import { useToastStore } from "./toasts";
import { handleApiErrors } from "../utils/api";

const { showLoading, hideLoading } = useGlobalLoading();

export const useVolumeStore = defineStore("volumeStore", {

    state: () => {
        return {
            volumes: {},
            errors: {},
        };
    },

    actions: {
        async getVolumes () {
            
        },

        async storeVolume(volumeData, publicationId) {
            showLoading("Adding new Volume...");

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publications/${publicationId}/volumes`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(volumeData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.router.replace({ name: 'AdminPublication' , params: { id: data.volume?.publication?.id}});
                    useToastStore().setToast(data.message);

                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },
    }

});