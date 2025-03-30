import { required, minLength, helpers } from "@vuelidate/validators";

export const loginRules = () => ({
    identifier: { required: helpers.withMessage('Email or Username is required', required) },
    password: { 
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8))
    }
});
