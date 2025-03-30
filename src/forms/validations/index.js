import { createPublisherRules } from "./createPublisherRules";
import { createPublicationRules } from "./createPublicationRules";
import { createVolumeRules } from "./createVolumeRules";
import { createIssueRules } from "./createIssueRules";
import { createAuthorRules } from "./createAuthorRules";
import { createKeywordRules } from "./createKeywordRules"
import { createArticleRules } from "./createArticleRules";

import { updatePublisherRules } from "./updatePublisherRules";
import { updatePublicationRules } from "./updatePublicationRules";
import { updateAuthorRules } from "./updateAuthorRules";
import { updateArticleRules } from "./updateArticleRules";
import { updateUserRules } from "./updateUserRules";

export const createValidations = {
    publisher: createPublisherRules,
    publication: createPublicationRules,
    volume: createVolumeRules,
    issue: createIssueRules,
    author: createAuthorRules,
    keyword: createKeywordRules,
    article: createArticleRules,
    //user:
};

export const updateValidations = {
    publisher: updatePublisherRules,
    publication: updatePublicationRules,
    author: updateAuthorRules,
    article: updateArticleRules,
    user: updateUserRules
}