import { required, helpers, url } from "@vuelidate/validators";

export const createArticleRules = {
    title: { required: helpers.withMessage('Title is required', required) },
    published_date: { required: helpers.withMessage('Published Date is required', required) },
    description: {  },
    link: {
        required: helpers.withMessage('Article Link is required', required),
        url: helpers.withMessage('Invalid URL format', url)
    },
    doi: {
        required: helpers.withMessage('DOI is required', required),
        url: helpers.withMessage('Invalid URL format', url)
    },
    pdf_link: { url: helpers.withMessage('Invalid URL format', url) },
    authors: {  },
    keywords: {  }
};