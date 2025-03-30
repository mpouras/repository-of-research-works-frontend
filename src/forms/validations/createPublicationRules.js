import { required, helpers, url, minLength } from "@vuelidate/validators";

export const createPublicationRules = {
    title: { required: helpers.withMessage('Title is required', required) },
    type: { required: helpers.withMessage('Type is required', required) },
    year_published: { required: helpers.withMessage('Year is required', required) },
    issn: { 
        required: helpers.withMessage('ISSN is required', required),
        format: helpers.withMessage('ISSN must be in format 0000-0000', helpers.regex(/^\d{4}-\d{4}$/))
    },
    description: { required: helpers.withMessage('Description is required', required) },
    link: {
        required: helpers.withMessage('Link is required', required),
        url: helpers.withMessage('Invalid URL format', url)
    },
    publishers: {
        required: helpers.withMessage('At least one publisher is required', required),
        minLength: helpers.withMessage('At least one publisher must be selected', minLength(1))
    }
};