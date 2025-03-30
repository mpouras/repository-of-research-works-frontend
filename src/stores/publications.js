import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { toast } from "vue3-toastify";
import { authToken } from "../utils/token";
import { buildApiQueryParams, handleApiErrors } from "../utils/api";
import { useToastStore } from "./toasts";
import { usePaginationStore } from "./pagination";
import { useRoute, useRouter } from "vue-router";

const { showLoading, hideLoading } = useGlobalLoading();

export const usePublicationStore = defineStore("publicationStore", {

    state: () => {
        return {
            publications: [],
            publication: {},
            errors: {},
        };
    },

    actions: {

        setPublication(data) {
            this.errors = {};
            this.publication = data;
        },

        setPublications(data) {
            this.errors = {};
            this.publications = data;
        },

        async getPublications(params) {
            const queryParams = buildApiQueryParams(params)
            showLoading('Loading publications...');

            try {
                const response = await fetch(`/api/publications${queryParams}`);
                const data = await response.json();

                if (!response.ok) {
                    this.publications = [];
                    handleApiErrors(data);
                    return;
                }

                this.setPublications(data.data);
                usePaginationStore().setPaginationInfo(data.meta);
                
            } catch (error) {
                this.errors = { message: error.message }; 
            } finally {
                hideLoading();
            }
        },

        async getPublication(id) {
            showLoading('Loading publication');

            try {
                const response = await fetch(`/api/publication/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    this.publication = {};
                    handleApiErrors(data);
                    return;
                }

                this.setPublication(data.data);

            } catch (error) {
                this.errors = { error: error.message }; 
            } finally {
                hideLoading();
            }
        },

        async storePublication(publicationData) {
            showLoading("Creating new Publication...");

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publications`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(publicationData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.router.replace({ name: 'AdminPublication' , params: { id: data.publication?.id}});
                    useToastStore().setToast(data.message, 'danger');

                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },

        async updatePublication(publicationData, id) {
            showLoading("Updating Publication...");

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publications/${id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(publicationData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }
    
                    this.setPublication(data.publication);
                    
                    useToastStore().showInstantToast(data.message);
                    
                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },

        async deletePublication(id) {
            const router = useRouter();
            const route = useRoute();

            showLoading("Deleting Publication...")

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publications/${id}`, {
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

                    if (route.name === 'AdminPublication') {
                        router.push({ name: 'AdminPublications' });
                        useToastStore().setToast(data.message);
                    } else {
                        useToastStore().showInstantToast(data.message);
                        await this.getPublications();
                    }

                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },

        async syncPublicationPublishers(publishersData, id, action) {
            showLoading("Syncing Publishers...");

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publications/${id}/publishers/${action}`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(publishersData),
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }


                    useToastStore().showInstantToast(data.message);
                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },
    }
});