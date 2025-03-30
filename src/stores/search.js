import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { buildApiQueryParams, handleApiErrors, buildApiSearchParams } from "../utils/api";
import { usePaginationStore } from "./pagination";

const { showLoading, hideLoading } = useGlobalLoading();

export const useSearchStore = defineStore("searchStore", {

    state: () => {
        return {
            results: {},
            errors: {},
        };
    },

    actions: {

        setResults(data) {
            this.errors = {}
            this.results = data.data ? data.data : data;
        },

        async search(params) {
            const queryParams = buildApiQueryParams(params);
            showLoading('Searching for results...');

            try {
                const response = await fetch(`/api/search${queryParams}`);
                const data = await response.json();

                if (!response.ok) {
                    this.results = {};
                    handleApiErrors(data);
                    return;
                }

                this.setResults(data);
                usePaginationStore().setPaginationInfo(data.meta);

            } catch (error) {
                this.errors = { error: error.message };
            } finally {
                hideLoading();
            }
        },

        async searchEntities(params) {
            const searchParams = buildApiSearchParams(params);

            try {
                const response = await fetch(`/api/search-entities${searchParams}`);
                const data = await response.json();


                if (!response.ok) {
                    this.results = {};
                    handleApiErrors(data);
                    return;
                }

                this.setResults(data[params.model]);
            }
            catch (error) {
                this.errors = { error: error.message };
            }
        },

    }
});