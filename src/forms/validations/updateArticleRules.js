import { required, url, helpers } from "@vuelidate/validators";

export const updateArticleRules = () => ({
    title: { required: helpers.withMessage('Title is required', required) },
    published_date: { required: helpers.withMessage('Year is required', required) },
    description: { required: helpers.withMessage('Description is required', required) },
    link: {
        required: helpers.withMessage('Link is required', required),
        url: helpers.withMessage('Invalid URL format', url)
    },
    doi: {
        required: helpers.withMessage('DOI is required', required),
        url: helpers.withMessage('Invalid URL format', url)
    },
    pdf_link: {
        url: helpers.withMessage('Invalid URL format', url)
    }
});