import { required, sameAs, minLength, helpers } from "@vuelidate/validators";

export const userChangePasswordRules = (form) => ({
    current_password: { 
        required: helpers.withMessage('Current password is required', required), 
        minLength: helpers.withMessage('Current Password must be at least 8 characters', minLength(8))
    },
    new_password: { 
        required: helpers.withMessage('New Password is required', required), 
        minLength: helpers.withMessage('New Password must be at least 8 characters', minLength(8))
    },
    new_password_confirmation: { 
        required: helpers.withMessage('New Password confirmation is required', required),
        sameAs: helpers.withMessage('New Passwords do not match', sameAs(form.new_password)),
    }
});