import { required, email, helpers } from "@vuelidate/validators";

export const updateUserRules = () => ({
    first_name: { required: helpers.withMessage('First name is required', required) },
    last_name: { required: helpers.withMessage('Last name is required', required) },
    email: { required: helpers.withMessage('Email is required', required), email: helpers.withMessage('Invalid email format', email) },
    username: { required: helpers.withMessage('Username is required', required) },
    role: { required, validRole: helpers.withMessage('Invalid role', v => ['admin', 'user'].includes(v)) },
    status: { required, validStatus: helpers.withMessage('Invalid status', v => ['active', 'inactive'].includes(v)) },
});