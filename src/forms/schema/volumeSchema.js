export const volumeSchema = () => ({
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