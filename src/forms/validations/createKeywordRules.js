import { required, helpers, minLength } from "@vuelidate/validators";

export const createKeywordRules = {
    name: { 
        required: helpers.withMessage('Name is required', required),
        minLength: helpers.withMessage('At least 2 characters', minLength(2))
    },
};