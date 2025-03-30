import { defineStore } from "pinia";
import { useGlobalLoading } from "../composables/useGlobalLoading";
import { handleApiErrors } from "../utils/api";
import { authToken } from "../utils/token";
import { useToastStore } from "./toasts";

const { showLoading, hideLoading } = useGlobalLoading();

export const useIssueStore = defineStore("issueStore", {

    state: () => {
        return {
            issues: {},
            errors: {},
        };
    },

    actions: {

        async getIssues(publicationId, volumeNumber) {
            showLoading('Loading issues...');
            this.errors = {};

            try {
                const response = await fetch(`/api/publications/${publicationId}/${volumeNumber}/issues`);
                const data = await response.json();

                if (!response.ok) {
                    this.issues = {};
                    handleApiErrors(data);
                    return;
                }

                this.errors = {};
                this.issues = data.data;
            } catch(error) {
                this.errors = { error: error.message }
            } finally {
                hideLoading();
            }
        },

        async storeIssue(issueData, publicationId, volumeNumber) {
            showLoading("Adding new Issue...");
            this.errors = {};

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/publications/${publicationId}/${volumeNumber}/issues`, {
                        method: 'POST',
                        headers: {
                            authorization: `Bearer ${authToken.value}`
                        },
                        body: JSON.stringify(issueData)
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        handleApiErrors(data);
                        return;
                    }

                    this.router.replace({ name: 'AdminPublication' , params: { id: data.issue?.volume?.publication?.id}});
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