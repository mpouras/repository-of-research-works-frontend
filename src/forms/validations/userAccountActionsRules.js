import { required, minLength, helpers, email } from "@vuelidate/validators";

export const modalValidationRules = {
    email: { 
        required: helpers.withMessage('Email is required', required), 
        email: helpers.withMessage('Invalid email format', email),
    },
    password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8))
    }
}