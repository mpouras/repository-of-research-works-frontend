import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useToastStore = defineStore("toastStore", {
    state: () => ({
        show: false,
        message: null,
        type: null,
    }),

    actions: {
        setToast(message, type = "success") {
            this.show = true;
            this.type = type;
            this.message = message;
        },

        hideToast() {
            this.show = false;
            this.message = null;
            this.type = null;
        },

        showToast() {
            if (this.show) {
                toast[this.type in toast ? this.type : 'success'](this.message);
                this.hideToast();
            }
        },

        showInstantToast(message, type = "success") {
            toast[type in toast ? type : "success"](message);
        },
    },
});
