import { required, helpers } from "@vuelidate/validators";

export const createVolumeRules = {
    number: { required: helpers.withMessage('Number is required', required) },
    year_published: { required: helpers.withMessage('Year is required', required) },
};