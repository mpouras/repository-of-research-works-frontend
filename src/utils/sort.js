const users = [
    { value: 'id', label: 'User ID' },
    { value: 'first_name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'role', label: 'Role'},
    { value: 'created_at', label: 'Signup Date' },
    { value: 'updated_at', label: 'Last Updated' },
];

const publishers = [
    { value: 'id', label: 'Publisher ID' },
    { value: 'name', label: 'Name' },
    { value: 'created_at', label: 'Creation Date' },
    { value: 'updated_at', label: 'Last Updated' },
];

const publications = [
    { value: 'id', label: 'Publication ID' },
    { value: 'title', label: 'Title' },
    { value: 'year_published', label: 'Publication Year' },
    { value: 'created_at', label: 'Creation Date' },
    { value: 'updated_at', label: 'Last Updated' },
];

const articles = [
    { value: 'id', label: 'ID' },
    { value: 'title', label: 'Title' },
    { value: 'published_date', label: 'Publication Date' },
    { value: 'created_at', label: 'Creation Date' },
    { value: 'updated_at', label: 'Last Modified' },
];

const authors = [
    { value: 'id', label: 'Author ID' },
    { value: 'name', label: 'Name' },
    { value: 'created_at', label: 'Creation Date' },
    { value: 'updated_at', label: 'Last Updated' },
];

const keywords = [
    { value: 'id', label: 'Keyword ID' },
    { value: 'name', label: 'Name' },
    { value: 'articles_count', label: 'Articles Count' },
    { value: 'created_at', label: 'Creation Date' },
    { value: 'updated_at', label: 'Last Updated' },
];

export const sortFieldsList = {
    users,
    publishers,
    publications,
    articles,
    authors,
    keywords
}

export const sortDirectionsList = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
];

export const paginationOptions = [
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 200, label: '200' },
];

export function pageDefaultParams(pageType = 'general') {
    const pageDefaults = {
        general: {
            page: 1,
            per_page: 20,
            sort_by: 'id',
            sort_order: 'asc',
        },
        ArticlesLatest: {
            page: 1,
            per_page: 20,
            sort_by: 'created_at',
            sort_order: 'desc',
        },
        Publications: {
            page: 1,
            per_page: 20,
            sort_by: 'title',
            sort_order: 'asc',
        },
        Search: {
            page: 1,
            per_page: 20,
            sort_by: 'published_date',
            sort_order: 'desc',
        }
    };

    return pageDefaults[pageType] || pageDefaults.general;
}