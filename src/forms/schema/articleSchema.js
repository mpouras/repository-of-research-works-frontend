export const articleSchema = () => ({
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
        issue: {
            object: 'issue',
            placeholder: 'Search for a issue...',
            result: 'issue_name',
            itemsList: ['id', 'name'],
            style: 'default',
            data: (result) => (result.name),
            requires: ['publication_id', 'volume_name']
        },
    },

    title: {
        label: 'Title',
        type: 'text',
        placeholder: 'Enter the article title'
    },
    published_date: {
        label: 'Published Date',
        type: 'date-picker',
        placeholder: 'Enter the published date'
    },
    description: {
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter a description'
    },
    link: {
        label: 'Link',
        type: 'text',
        placeholder: 'Enter the article link'
    },
    doi: {
        label: 'DOI',
        type: 'text',
        placeholder: 'Enter the DOI'
    },
    pdf_link: {
        label: 'PDF Link',
        type: 'text',
        placeholder: 'Enter the PDF link'
    },
    authors: {
        label: 'Select Authors',
        type: 'badge-input',
        placeholder: 'Search for authors',
        object: 'author',
        listItems: ['id', 'name']
    },
    keywords: {
        label: 'Keywords',
        type: 'badge-input',
        placeholder: 'Search for keywords',
        object: 'keyword',
        listItems: ['id', 'name']
    },
});