export const issueSchema = () => ({
    requirements: {
        publication: {
            object: 'publication',
            placeholder: 'Search for a publication...',
            result: 'publication_id',
            itemsList: ['id', 'title'],
            style: 'default',
            data: (result) => (result.id)
        },
        volume: {
            object: 'volume',
            placeholder: 'Search for a volume...',
            result: 'volume_number',
            itemsList: ['id', 'number'],
            style: 'default',
            data: (result) => (result.number),
            requires: ['publication_id']
        },
    },

    name: {
        label: 'Issue Name',
        type: 'text',
        placeholder: 'Enter the issue name'
    },
    month_published: {
        label: 'Month Published',
        type: 'select',
        options: [
            { value: '', label: 'Select the Month'},
            { value: '1', label: 'January' },
            { value: '2', label: 'February' },
            { value: '3', label: 'March' },
            { value: '4', label: 'April' },
            { value: '5', label: 'May' },
            { value: '6', label: 'June' },
            { value: '7', label: 'July' },
            { value: '8', label: 'August' },
            { value: '9', label: 'September' },
            { value: '10', label: 'October' },
            { value: '11', label: 'November' },
            { value: '12', label: 'December' }
        ]
    }
});