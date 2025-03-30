<template>
    <div>
        <AdminTopActions :updateAction="updateArticle" :deleteAction="deleteArticle"/>

        <h1 class="admin-title capitalize">{{ articleStore.articles?.title }}</h1>

        <hr class="my-5">

        <AdminObjectsBasicInfoCard :object="articleStore.article" />

        <hr class="my-5">

        <AdminObjectUpdateForm 
            v-if="dataLoaded"
            ref="updateForm" 
            type="article"
            :schema="schema" 
            :validationRules="rules" 
            :initialData="articleStore.article"
        />

        <section class="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div>
                <h1 class="text-xl text-center font-bold mb-4 uppercase">Authors</h1>
                <hr class="my-5">

                <AdminObjectsReferenceSection :object="'author'" :objectList="articleStore.article?.authors" @refresh="fetchArticle"/>

                <hr class="my-5">
            </div>

            <div>
                <h1 class="text-xl text-center font-bold mb-4 uppercase">Keywords</h1>
                <hr class="my-5">

                <AdminObjectsReferenceSection :object="'keyword'" :objectList="articleStore.article?.keywords" @refresh="fetchArticle"/>

                <hr class="my-5">
            </div>

        </section>
    </div>
</template>

<script setup>
import { useArticleStore } from '../../stores/articles';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref, computed } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import AdminTopActions from '../../components/AdminTopActions.vue';
import AdminObjectsBasicInfoCard from '../../components/AdminObjectsBasicInfoCard.vue';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { updateArticleRules } from '../../forms/validations/updateArticleRules';
import AdminObjectsReferenceSection from '../../components/AdminObjectsReferenceSection.vue';
import AdminObjectUpdateForm from '../../components/AdminObjectUpdateForm.vue';
import { updateSchemas } from '../../forms/schema';

const articleStore = useArticleStore();
const route = useRoute();
const { openModal } = useConfirmationModal();

const id = route.params.id;
const dataLoaded = ref(false);
const updateForm = ref(null);

const schema = updateSchemas.article();
const rules = computed(() => {
    return updateArticleRules();
});

async function fetchArticle() {
    await articleStore.articleById(id);
    document.title = `Article - ${articleStore.article.title}`;
    dataLoaded.value = true;
}

onMounted(async() => {
    await fetchArticle();
});

const updateArticle = () => {
    if (updateForm.value) {
        updateForm.value.onSubmit();
    }
};

async function deleteArticle() {
    const confirmed = await openModal();
    if (!confirmed) return;
    
    await articleStore.deleteArticle(id);
}
</script>