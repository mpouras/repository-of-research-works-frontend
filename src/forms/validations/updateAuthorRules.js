import { required, url, helpers } from "@vuelidate/validators";

export const updateAuthorRules = () => ({
    name: { required: helpers.withMessage('Title is required', required) },
    university: {  },
    profile_link: {
        required: helpers.withMessage('Link is required', required),
        url: helpers.withMessage('Invalid URL format', url)
    },
    orcid_link: { url: helpers.withMessage('Invalid URL format', url) }
});