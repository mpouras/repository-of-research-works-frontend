import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { authToken } from "../utils/token";
import { useToastStore } from "./toasts";
import { usePaginationStore } from "./pagination";
import { buildApiQueryParams } from "../utils/api";
import { useRoute, useRouter } from "vue-router";

const { showLoading, hideLoading } = useGlobalLoading();

export const usePublisherStore = defineStore("publisherStore", {

    state: () => {
        return {
            publishers: [],
            publisher: {},
            errors: {},
        };
    },

    actions: {

        setPublisher(data) {
            this.errors = {};
            this.publisher = data;
        },

        setPublishers(data) {
            this.errors = {};
            this.publishers = data;
        },

        clearPublisher() {
            this.publisher = {};
        },

        async getPublishers(params) {
            const queryParams = buildApiQueryParams(params);
            showLoading('Loading publications...');

            try {
                const response = await fetch(`/api/publishers${queryParams}`);
                const data = await response.json();
                
                if (!response.ok) {
                    this.publishers = [];
                    handleApiErrors(data);
                    return;
                }

                this.setPublishers(data.data);
                usePaginationStore().setPaginationInfo(data);

            } catch (error) {
                this.publishers = {};
                this.errors = { error: error.message };
            } finally {
                hideLoading();
            }
        },

        async getPublisher(id) {
            showLoading("Loading Publisher...")
            try {
                const response = await fetch(`/api/publishers/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    this.publisher = {};
                    handleApiErrors(data);
                    return;
                }

                this.setPublisher(data.data);

            } catch (error) {
                this.publisher = {};
                this.errors = { error: error.message };
            } finally {
                hideLoading();
            }
        },

        async storePublisher(publisherData) {
            showLoading("Adding new Publisher...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publishers`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(publisherData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.router.replace({ name: 'AdminPublisher' , params: { id: data.publisher?.id}});
                    useToastStore().setToast(data.message);

                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },

        async updatePublisher(publisherData, id) {
            showLoading("Updating Publisher...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publishers/${id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(publisherData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.setPublisher(data.publisher);
                    useToastStore().showInstantToast(data.message);

                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },

        async deletePublisher(id) {
            const router = useRouter();
            const route = useRoute();

            showLoading("Deleting Publisher...")

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publishers/${id}`, {
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

                    if (route.name === 'AdminPublisher') {
                        router.push({ name: 'AdminPublishers' });
                        useToastStore().setToast(data.message);
                    } else {
                        useToastStore().showInstantToast(data.message);
                        await this.getPublishers();
                    }

                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().setToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        }
    }

});