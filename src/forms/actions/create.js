import { usePublisherStore } from '../../stores/publishers';
import { usePublicationStore } from '../../stores/publications';
import { useVolumeStore } from '../../stores/volume';
import { useIssueStore } from '../../stores/issues';
import { useArticleStore } from '../../stores/articles';
import { useAuthorStore } from '../../stores/author';
import { useKeywordsStore } from '../../stores/keywords';

export const create = {
    publisher: (data) => usePublisherStore().storePublisher(data),
    publication: (data) => usePublicationStore().storePublication(data),
    volume: (data, publication_id) => useVolumeStore().storeVolume(data, publication_id),
    issue: (data, publication_id, volume_number) => useIssueStore().storeIssue(data, publication_id, volume_number),
    article: (data, publication_id, volume_number, issue_name) => useArticleStore().storeArticle(data, publication_id, volume_number, issue_name),
    author: (data) => useAuthorStore().storeAuthor(data),
    keyword: (data) => useKeywordsStore().storeKeyword(data)
};