export const publicationSchema = () => ({
    title: {
        label: 'Title',
        type: 'text',
        placeholder: 'Enter a title'
    }, 
    type: {
        label: 'Type',
        type: 'select',
        options: [
            { value: '', label: 'Select the type'},
            { value: 'Book', label: 'Book' },
            { value: 'Journal', label: 'Journal' },
            { value: 'Magazine', label: 'Magazine' }
        ]
    }, 
    year_published: {
        label: 'Published Year',
        type: 'year-picker',
        placeholder: 'Enter the published year'
    }, 
    issn: {
        label: 'ISSN',
        type: 'text',
        placeholder: 'Enter the ISSN'
    }, 
    description: {
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter a description'
    }, 
    link: {
        label: 'Link',
        type: 'text',
        placeholder: 'Enter the link'
    },
    publishers: {
        label: 'Select Publishers',
        type: 'badge-input',
        placeholder: 'Search for publishers',
        object: 'publisher',
    },
});