import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { buildApiQueryParams, handleApiErrors } from "../utils/api";
import { useQueryParamsStore } from "./queryParams";
import { usePaginationStore } from "./pagination";
import { authToken } from "../utils/token";
import { useRoute, useRouter } from "vue-router";
import { useToastStore } from "./toasts";

const { showLoading, hideLoading } = useGlobalLoading();

export const useKeywordsStore = defineStore("keywordStore", {

    state: () => {
        return {
            keywords: [],
            keywordArticles: {},
            errors: {},
        };
    },

    actions: {

        setKeywords(data) {
            this.errors = {};
            this.keywords = data;
            this.keywordArticles = data?.articles;
        },

        async getKeywords(params) {
            const queryParams = buildApiQueryParams(params);

            try {
                const response = await fetch(`/api/keywords${queryParams}`);
                const data = await response.json();

                if (!response.ok) {
                    this.keywords = [];
                    handleApiErrors(data);
                    return;
                }

                this.setKeywords(data.data);
                usePaginationStore().setPaginationInfo(data);

            } catch (error) {
                this.errors = { message: error.message }; 
            }
        },

        async getKeyword(name, params) {
            showLoading('Loading Keyword..');
            const queryParams = buildApiQueryParams(params);

            try {
                const response = await fetch(`/api/keywords/${name}${queryParams}`);
                const data = await response.json();

                if (!response.ok) {
                    this.keywords = [];
                    handleApiErrors(data);
                    return;
                }

                this.setKeywords(data.data);
                usePaginationStore().setPaginationInfo(data.data.meta);

            } catch (error) {
                this.errors = { message: error.message }; 
            } finally {
                hideLoading();
            }
        },

        async storeKeyword(keywordData) {
            showLoading('Adding new Keyword..');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/keywords`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(keywordData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.router.replace({ name: 'AdminKeywords' });
                    useToastStore().setToast(data.message);

                } catch (error) {
                    this.errors = { message: error.message }; 
                } finally {
                    hideLoading();
                }
            }
        },

        async updateKeyword(keywordData, id) {
            const { queryParams } = useQueryParamsStore();
            showLoading('Updating Keyword..');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/keywords/${id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(keywordData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.getKeywords(queryParams);
                    useToastStore().showInstantToast(data.message);

                } catch (error) {
                    this.errors = { message: error.message }; 
                } finally {
                    hideLoading();
                }
            }
        },

        async deleteKeyword(name) {
            const router = useRouter();
            const route = useRoute();

            showLoading('Deleting Keyword...');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/keywords/${name}`, {
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
                    
                    if (route.name === 'AdminKeyword') {
                        router.push({ name: 'AdminKeywords' });
                        useToastStore().setToast(data.message);
                    } else {
                        useToastStore().showInstantToast(data.message);
                        await this.getKeywords();
                    }
                } catch (error) {
                    this.errors = { message: error.message }; 
                } finally {
                    hideLoading();
                }
            }
        }
    }
});