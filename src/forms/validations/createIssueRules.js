import { required, helpers, between } from "@vuelidate/validators";

export const createIssueRules = {
    name: { required: helpers.withMessage('Name is required', required) },
    month_published: { 
        required: helpers.withMessage('Month is required', required),
        between: helpers.withMessage('Month must be between 1 and 12', between(1, 12))
    },
};