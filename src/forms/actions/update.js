import { usePublisherStore } from '../../stores/publishers';
import { usePublicationStore } from '../../stores/publications';
import { useVolumeStore } from '../../stores/volume';
import { useIssueStore } from '../../stores/issues';
import { useArticleStore } from '../../stores/articles';
import { useAuthorStore } from '../../stores/author';
import { useKeywordsStore } from '../../stores/keywords';
import { useAdminStore } from '../../stores/admin';

export const update = {
    user: (data, id) => useAdminStore().updateUser(data, id),
    publisher: (data, id) => usePublisherStore().updatePublisher(data, id),
    publication: (data, id) => usePublicationStore().updatePublication(data, id),
    volume: (data, id) => useVolumeStore().updateVolume(data, id),
    issue: (data, id) => useIssueStore().updateIssue(data, id),
    article: (data, id) => useArticleStore().updateArticle(data, id),
    author: (data, id) => useAuthorStore().updateAuthor(data, id),
    keyword: (data, id) => useKeywordsStore().updateKeyword(data, id)
};