import { userSchema } from "./userSchema";
import { publisherSchema } from "./publisherSchema";
import { publicationSchema } from "./publicationSchema";
import { volumeSchema } from "./volumeSchema";
import { issueSchema } from "./issueSchema";
import { articleSchema } from "./articleSchema";
import { authorSchema } from "./authorSchema";
import { keywordSchema } from "./keywordSchema";

export const createSchemas = {
    user: userSchema,
    publisher: publisherSchema,
    publication: publicationSchema,
    volume: volumeSchema,
    issue: issueSchema,
    article: articleSchema,
    author: authorSchema,
    keyword: keywordSchema
};

export const updateSchemas = {
    user: userSchema,
    publisher: publisherSchema,
    publication: () => {
        const schema = { ...publicationSchema() };
        delete schema.publishers;
        return schema;
    },
    article: () => {
        const schema = { ...articleSchema() };
        delete schema.requirements;
        delete schema.authors;
        delete schema.keywords;
        return schema;
    },
    author: authorSchema,
    keyword: keywordSchema
}