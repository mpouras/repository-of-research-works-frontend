<template>
    <div class="page">

        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div v-else-if="article">
            <div class="relative">
                <div class="component-title-primary">
                    {{ article.title }}
                </div>
            </div>

            <div class="flex items-center flex-row gap-1 my-2 text-md">
                Date Published
                <span class="px-2 py-0.5 rounded-md font-semibold bg-orange-100">
                    {{ formatDate(article.published_date) }}
                </span>
            </div>

            <div class="text-lg text-gray-400">
                <i :class="icons.publications"></i>
                {{ article.publication?.title }}
                <span>&middot;</span>
                Volume {{ article.volume?.number }}
                <span>&middot;</span>
                Issue {{ article.issue?.name }}
            </div>

            <div v-if="userStore.role === 'user' || article.pdf_link" class="my-3 border-y-4 flex flex-row items-center">
                <ArticleToggleLibrary v-if="userStore.role === 'user'" :articleId="article.id" :showLabel="true" class="w-48"/>
                <a v-if="article.pdf_link" :href="article.pdf_link" target="_blank"
                    class="text-red-500 hover:text-red-200">
                    <i :class="[icons.pdf, 'text-5xl']"></i>
                </a>
            </div>

            <div class="flex flex-col gap-1">
                <div class="component-title-secondary">Resources</div>
                <a :href="article.link" target="_blank" class="link-text">
                    <i :class="icons.link"></i>
                    {{ article.title }}
                </a>
                <a :href="article.doi" target="_blank" class="link-text">
                    <i :class="icons.link"></i>
                    {{ article.doi }}
                </a>
            </div>

            <div>
                <div class="component-title-secondary">Authors</div>
                <div class="flex flex-wrap gap-2 my-4 text-md text-gray-600 items-center">
                    <i :class="[icons.authorsFilled, 'mdi-18px']"></i>
                    <a v-for="author in article?.authors" :key="author.name" @click="showAuthorModal(author)"
                        class="px-2 py-0.5 rounded-md font-semibold bg-gray-200 hover:underline cursor-pointer">
                        {{ author.name }}
                    </a>
                </div> 
            </div>

            <ArticleAuthorModal ref="authorModalRef"/>


            <div class="py-3">
                <div class="component-title-secondary">Description</div>
                {{ article.description }}
            </div>

            <div class="py-3">
                <div class="component-title-secondary">Keywords</div>
                <div class="flex flex-wrap gap-2">
                    <router-link
                        v-for="keyword in article?.keywords"
                        :key="keyword.id"
                        :to="{ name: 'Keyword', params: { name: keyword.name }}"
                        :class="getRandomColor() + ' py-1 px-2 rounded-lg text-lg font-semibold'"
                    >
                        <i :class="icons.hashtag"></i>
                        {{ keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1).toLowerCase() }}
                    </router-link>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useArticleStore } from '../../stores/articles';
import { useRoute } from 'vue-router';
import { formatDate } from '../../utils/dates';
import { getRandomColor } from '../../utils/colors';
import ArticleAuthorModal from '../../components/ArticleAuthorModal.vue';
import ArticleToggleLibrary from '../../components/ArticleToggleLibrary.vue';
import { useUserStore } from '../../stores/user';
import { icons } from '../../utils/icons';

const route = useRoute();

const userStore = useUserStore();
const articleStore = useArticleStore();

const article = ref({});
const errors = ref({});

const authorModalRef = ref(null);

async function getArticle() {
    const publicationId = route.params.publicationId;
    const volumeNumber = route.params.volumeNumber;
    const issueName = route.params.issueName;
    const id = route.params.articleId;
    await articleStore.getArticle(publicationId, volumeNumber, issueName, id);
    article.value = articleStore.article;
    errors.value = articleStore.errors;
}

function showAuthorModal(author) {
    if (authorModalRef.value) {
        authorModalRef.value.openModal(author);
    }
}

onMounted(() => {
    getArticle();
});
</script>

<style scoped></style>