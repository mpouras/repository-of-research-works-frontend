<template>
    <div>
        <AdminTopActions :updateAction="updateAuthor" :deleteAction="deleteAuthor"/>

        <h1 class="admin-title capitalize">{{ authorStore.author?.name }}</h1>

        <hr class="my-5">

        <AdminObjectsBasicInfoCard :object="authorStore.author" /> 
        
        <hr class="my-5">

        <AdminObjectUpdateForm 
            v-if="dataLoaded"
            ref="updateForm" 
            type="author"
            :schema="schema" 
            :validationRules="rules" 
            :initialData="authorStore.author"
        />

        <BaseMiniList 
            title="Articles"
            :icon="icons.articles"
            :items="authorStore.author?.articles"
            :navigateObject="() => $router.push({ name: 'AdminArticles' })"
            :navigateItem="(item) => $router.push({ name: 'AdminArticle', params: { id: item.id } })"
        />
    </div>
</template>

<script setup>
import { useAuthorStore } from '../../stores/author';
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { updateAuthorRules } from '../../forms/validations/updateAuthorRules';
import AdminTopActions from '../../components/AdminTopActions.vue';
import AdminObjectsBasicInfoCard from '../../components/AdminObjectsBasicInfoCard.vue';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { icons } from '../../utils/icons';
import BaseMiniList from '../../components/BaseMiniList.vue';
import AdminObjectUpdateForm from '../../components/AdminObjectUpdateForm.vue';
import { updateSchemas } from '../../forms/schema';

const authorStore = useAuthorStore();
const route = useRoute();
const { openModal } = useConfirmationModal();

const id = route.params.id;
const dataLoaded = ref(false);
const updateForm = ref(null);

const schema = updateSchemas.author();
const rules = computed(() => {
    return updateAuthorRules();
});

async function fetchAuthor() {
    await authorStore.getAuthor(id);
    document.title = `Author - ${authorStore.author.name}`;
    dataLoaded.value = true;
}

onMounted(async() => {
    await fetchAuthor();
});

const updateAuthor = () => {
    if (updateForm.value) {
        updateForm.value.onSubmit();
    }
};

async function deleteAuthor() {
    const confirmed = await openModal();
    if (!confirmed) return;

    await authorStore.deleteAuthor(id);
}
</script>