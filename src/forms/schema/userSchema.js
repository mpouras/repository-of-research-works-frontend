export const userSchema = () => ({
    first_name: {
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter first name'
    }, 
    last_name: {
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter last name'
    }, 
    email: {
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address'
    }, 
    username: {
        label: 'Username',
        type: 'text',
        placeholder: 'Enter a username'
    }, 
    role: {
        label: 'User Role',
        type: 'select',
        options: [
            { value: '', label: 'Select the user role'},
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' },
        ]
    }, 
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { value: '', label: 'Select the status of user'},
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
        ]
    }
});