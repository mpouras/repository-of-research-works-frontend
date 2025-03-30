import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { buildApiQueryParams, handleApiErrors } from "../utils/api";
import { usePaginationStore } from "./pagination";
import { authToken } from "../utils/token";
import { useToastStore } from "./toasts";
import { useRoute, useRouter } from "vue-router";

const { showLoading, hideLoading } = useGlobalLoading();

export const useArticleStore = defineStore("articleStore", {

    state: () => {
        return {
            publication: {},
            articles: {},
            article: {},
            errors: {},
        };
    },

    actions: {

        setArticles(data) {
            this.errors = {};
            this.publication = data.data[0]?.publication;
            this.articles = data.data;
        },

        setArticle(data) {
            this.errors = {};
            this.article = data.data;
        },

        clearArticles() {
            this.articles = {};
            this.publication = {};
        },

        async getAllArticles(params) {
            const queryParams = buildApiQueryParams(params);
            showLoading('Loading articles...');

            try {
                const response = await fetch(`/api/articles${queryParams}`);
                const data = await response.json();

                if (!response.ok) {
                    this.articles = {};
                    handleApiErrors(data);
                    return;
                }

                this.setArticles(data);
                usePaginationStore().setPaginationInfo(data.meta);
                
            } catch (error) {
                this.errors = { error: error.message }; 
            } finally {
                hideLoading();
            }
        },

        async getArticles(publicationId, volumeNumber, issueName, params) {
            const queryParams = buildApiQueryParams(params);
            showLoading('Loading articles');

            try {
                const response = await fetch(`/api/publications/${publicationId}/${volumeNumber}/${issueName}/articles${queryParams}`);
                const data = await response.json();

                console.log(response);
                if (!response.ok) {
                    handleApiErrors(data);
                    this.articles = {};
                    return;
                }

                this.setArticles(data);
                usePaginationStore().setPaginationInfo(data.meta);

            } catch (error) {
                this.errors = { error: error.message }; 
            } finally {
                hideLoading();
            }
        },

        async getArticle(publicationId, volumeNumber, issueName, id) {

            showLoading('Loading article');
            try {
                const response = await fetch(`/api/publications/${publicationId}/${volumeNumber}/${issueName}/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    handleApiErrors(data);
                    this.article = {};
                    return;
                }

                this.setArticle(data);
                
            } catch (error) {
                this.errors = {  error: error.message }
            } finally {
                hideLoading();
            }
        },

        async articleById(id) {
            showLoading('Loading article');
            
            try {
                const response = await fetch(`/api/articles/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    handleApiErrors(data);
                    this.article = {};
                    return;
                }

                this.setArticle(data);
                
            } catch (error) {
                this.errors = {  error: error.message }
            } finally {
                hideLoading();
            }
        },

        async storeArticle(articleData, publication_id, volume_number, issue_name) {
            showLoading("Adding new Article...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publications/${publication_id}/${volume_number}/${issue_name}/articles`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(articleData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.router.replace({ name: 'AdminArticle' , params: { id: data.article?.id }});
                    useToastStore().setToast(data.message);

                } catch (error) {
                    this.errors = { error: error.message };
                } finally {
                    hideLoading();
                }
            }
        },

        async updateArticle(articleData, id) {
            showLoading('Loading article');
            
            if (authToken.value) {
                try {
                    const response = await fetch(`/api/articles/${id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(articleData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.setArticle(data.article);
                    useToastStore().showInstantToast(data.message);
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        },

        async deleteArticle(id) {
            const router = useRouter();
            const route = useRoute();

            showLoading('Deleting article...');

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/articles/${id}`, {
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

                    if (route.name === 'AdminArticle') {
                        router.push({ name: 'AdminArticles' });
                        useToastStore().setToast(data.message);
                    } else {
                        useToastStore().showInstantToast(data.message);
                        await this.getAllArticles();
                    }
                    
                } catch (error) {
                    this.errors = { error: error.message };
                    useToastStore().showInstantToast(error.message, 'error');
                } finally {
                    hideLoading();
                }
            }
        },

        async syncArticleAuthors(authorsData, id, action) {
            showLoading("Syncing Authors...");

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/articles/${id}/authors/${action}`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(authorsData),
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

        async syncArticleKeywords(keywordsData, id, action) {
            showLoading("Syncing Keywords...");

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/articles/${id}/keywords/${action}`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                        body: JSON.stringify(keywordsData),
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