import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { buildApiQueryParams, handleApiErrors } from "../utils/api";
import { usePaginationStore } from "./pagination";
import { authToken } from "../utils/token";
import { useToastStore } from "./toasts";
import { useRoute, useRouter } from "vue-router";

const { showLoading, hideLoading } = useGlobalLoading();

export const useAuthorStore = defineStore("authorStore", {

    state: () => {
        return {
            authors: [],
            author: {},
            authorArticles: {},
            errors: {},
        };
    },

    actions: {

        setAuthors(data) {
            this.errors = {};
            this.authors = data;
            this.authorArticles = data.articles;
        },

        setAuthor(data) {
            this.errors = {};
            this.author = data;
            this.authorArticles = data.articles;
        },

        clearAuthor() {

        },

        clearAuthors() {

        },

        async getAuthors(params) {
            const queryParams = buildApiQueryParams(params);
            showLoading('Loading authors...');

            try {
                const response = await fetch(`/api/authors${queryParams}`);
                const data = await response.json();

                if (!response.ok) {
                    this.authors = [];
                    handleApiErrors(data);
                    return;
                }

                this.setAuthors(data.data);
                usePaginationStore().setPaginationInfo(data);
                
            } catch (error) {
                this.authors = [];
                this.errors = { error: "Unable to connect to the server. Please try again later." };
            } finally {
                hideLoading();
            }
        },

        async getAuthor(id, params) {
            const queryParams = buildApiQueryParams(params);
            showLoading('Loading author...');

            try {
                const response = await fetch(`/api/authors/${id}${queryParams}`);
                const data = await response.json();

                if (!response.ok) {
                    this.author = {};
                    handleApiErrors(data);
                    return;
                }

                this.setAuthor(data.data);
                usePaginationStore().setPaginationInfo(data.data.meta);

            } catch (error) {
                this.author = {};
                this.errors = { error: "Unable to connect to the server. Please try again later." };
            } finally {
                hideLoading();
            }
        },

        async storeAuthor(authorData) {
            showLoading("Adding new Author...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/authors`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(authorData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.router.replace({ name: 'AdminAuthor' , params: { id: data.author?.id }});
                    useToastStore().setToast(data.message);

                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },

        async updateAuthor(authorData, id) {
            showLoading('Updating author...');
            
            if (authToken.value) {
                try {
                    const response = await fetch(`/api/authors/${id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(authorData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.setAuthor(data.author);
                    useToastStore().showInstantToast(data.message);
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        },

        async deleteAuthor(id) {
            const router = useRouter();
            const route = useRoute();

            showLoading('Deleting author...');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/authors/${id}`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.errors = {};

                    if (route.name === 'AdminAuthor') {
                        router.push({ name: 'AdminAuthors' });
                        useToastStore().setToast(data.message);
                    } else {
                        useToastStore().showInstantToast(data.message);
                        await this.getAuthors();
                    }
                    
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