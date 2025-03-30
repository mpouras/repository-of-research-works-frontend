import { required, helpers, url } from "@vuelidate/validators";

export const createAuthorRules = {
    name: { required: helpers.withMessage('Author Name is required', required) },
    university: {  },
    profile_link: { 
        required: helpers.withMessage('Number is required', required) ,
        url: helpers.withMessage('Invalid URL format', url)
    },
    orcid_link: { url: helpers.withMessage('Invalid URL format', url) },
};