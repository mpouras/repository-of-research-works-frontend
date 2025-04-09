export const volumeSchema = () => ({
    requirements: {
        publication: {
            object: 'publication',
            placeholder: 'Search for a publication...',
            result: 'publication_id',
            itemsList: ['id', 'title'],
            style: 'default',
            data: (result) => (result.id)
        },
    },

    number: {
        label: 'Volume Number',
        type: 'text',
        placeholder: 'Enter the volume number'
    },
    year_published: {
        label: 'Year Published',
        type: 'year-picker',
        placeholder: 'Enter the year published'
    }
});