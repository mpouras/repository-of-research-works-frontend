export const authorSchema = () => ({
    name: {
        label: 'Author Name',
        type: 'text',
        placeholder: 'Enter the author’s name'
    },
    university: {
        label: 'University',
        type: 'text',
        placeholder: 'Enter the university name'
    },
    profile_link: {
        label: 'Profile Link',
        type: 'text',
        placeholder: 'Enter the profile link'
    },
    orcid_link: {
        label: 'ORCID Link',
        type: 'text',
        placeholder: 'Enter the ORCID link'
    }
});