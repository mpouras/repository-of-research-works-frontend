import { usePublicationStore } from "../../stores/publications";
import { useArticleStore } from "../../stores/articles";

export const sync = {
    publisher: (data, id, action) => usePublicationStore().syncPublicationPublishers(data, id, action),
    author: (data, id, action) => useArticleStore().syncArticleAuthors(data, id, action),
    keyword: (data, id, action) => useArticleStore().syncArticleKeywords(data, id, action)
};

export const schemas = {
    publisher: {
        object: 'publisher',
        placeholder: 'Search for a publisher...',
        result: 'publishers',
        itemsList: ['id', 'name'],
        style: 'default',
        data: (result) => ({ publishers: [result] })
    },
    author: {
        object: 'author',
        placeholder: 'Search for an author...',
        result: 'authors',
        itemsList: ['id', 'name'],
        style: 'default',
        data: (result) => ({ authors: [result] })
    },
    keyword: {
        object: 'keyword',
        placeholder: 'Search for an keyword...',
        result: 'keywords',
        itemsList: ['name'],
        style: 'tags',
        data: (result) => ({ keywords: [result] })
    },
};