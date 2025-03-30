import { helpers, maxLength, url } from '@vuelidate/validators';

export const userUpdateProfileRules = (form) => ({
    first_name: { required: helpers.withMessage('First name is required', (value) => !!value) },
    last_name: { required: helpers.withMessage('Last name is required', (value) => !!value) },
    username: { required: helpers.withMessage('Username is required', (value) => !!value) },
    bio: { 
        maxLength: helpers.withMessage('Bio must be at most 100 characters', maxLength(100)),
    },
    birthday: {},
    gender: {},
    linkedin_url: { 
        // url: helpers.withMessage('Linkedin URL must be a valid url', url)
    },
    country: {}
});