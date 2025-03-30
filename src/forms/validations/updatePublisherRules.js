import { required, helpers } from "@vuelidate/validators";

export const updatePublisherRules = () => ({
    name: { required: helpers.withMessage('Name is required', required) },
    scraper: { required: helpers.withMessage('Scraper is required', required) },
});