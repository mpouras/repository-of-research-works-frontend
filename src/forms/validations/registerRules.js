import { required, minLength, sameAs, email, helpers } from "@vuelidate/validators";

export const registerRules = (form) => ({
    first_name: { required: helpers.withMessage('First name is required', required) },
    last_name: { required: helpers.withMessage('Last name is required', required) },
    email: { 
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Invalid email format', email)
    },
    username: { required: helpers.withMessage('Username is required', required) },
    password: { 
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8))
    },
    password_confirmation: { 
        required: helpers.withMessage('Password confirmation is required', required),
        sameAs: helpers.withMessage('Passwords do not match', sameAs(form.password))
    }
});
