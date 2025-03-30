import { defineStore } from "pinia";
import { authToken } from "../utils/token";

export const useUserLibraryStore = defineStore("userLibraryStore", {

    state: () => {
        return {
            libraryItems: {},
            errors: {},
        };
    },

    actions: {
    
        async userLibrary() {

            if (authToken.value) {
                try {
                    const response = await fetch(`/api/user/library`, {
                        headers: {
                            authorization: `Bearer ${authToken.value}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        this.libraryItems = {};
                        handleApiErrors(data);
                        return;
                    }
    
                    this.errors = {};
                    this.libraryItems = data.data;

                } catch (error) {
                    this.errors = { error: error.message };
                }

            }
        },

        async addToLibrary(libraryData) {

            try {
                const response = await fetch(`/api/user/library`, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${authToken.value}`,
                    },
                    body: JSON.stringify(libraryData)
                });
                const data = await response.json();

                if (!response.ok) {
                    this.libraryItems = {};
                    handleApiErrors(data);
                    return;
                }

                this.errors = {};
                this.libraryItems = data;

                await this.userLibrary();
            } catch (error) {
                this.errors = { error: error.message };
            }
        },

        async removeFromLibrary(id) {

            try {
                const response = await fetch(`/api/user/library/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${authToken.value}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    this.libraryItems = {};
                    handleApiErrors(data);
                    return;
                }


                this.errors = {};
                this.libraryItems = data;

                await this.userLibrary();
            } catch (error) {
                this.errors = { error: error.message };
            }
        }
    }

});