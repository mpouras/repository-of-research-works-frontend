import { required, sameAs, minLength, helpers, email } from "@vuelidate/validators";

export const userChangeEmailRules = (form, currentEmail) => ({
    email: { 
        required: helpers.withMessage('Email is required', required), 
        email: helpers.withMessage('Invalid email format', email),
        notSameAsCurrent: helpers.withMessage('New email must be different from the current email', 
            (value) => value !== currentEmail
        )
    },
    email_confirmation: { 
        required: helpers.withMessage('Email confirmation is required', required), 
        email: helpers.withMessage('Invalid email format', email),
        sameAs: helpers.withMessage('Emails do not match', sameAs(form.email)),
        notSameAsCurrent: helpers.withMessage('New email must be different from the current email', 
            (value) => value !== currentEmail
        )
    },
});

export const modalValidationRules = {
    password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8))
    }
}