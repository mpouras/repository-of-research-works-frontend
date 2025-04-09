import { required, url, helpers } from "@vuelidate/validators";

export const updatePublicationRules = () => ({
    title: { required: helpers.withMessage('Title is required', required) },
    type: { required: helpers.withMessage('Type is required', required) },
    year_published: { required: helpers.withMessage('Year is required', required) },
    issn: { format: helpers.withMessage('ISSN must be in format 0000-0000', helpers.regex(/^\d{4}-\d{4}$/)) },
    description: {  },
    link: {
        required: helpers.withMessage('Link is required', required),
        url: helpers.withMessage('Invalid URL format', url)
    }
});