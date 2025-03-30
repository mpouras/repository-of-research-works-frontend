<template>
    <div>
        <AdminTopActions :updateAction="updatePublisher" :deleteAction="deletePublisher" />

        <h1 class="admin-title capitalize">{{ publisherStore.publisher?.name }}</h1>

        <hr class="my-5">

        <AdminObjectsBasicInfoCard :object="publisherStore.publisher" />

        <hr class="my-5">

        <AdminObjectUpdateForm 
            v-if="dataLoaded"
            ref="updateForm" 
            type="publisher"
            :schema="schema" 
            :validationRules="rules" 
            :initialData="publisherStore.publisher"
        />

        <hr class="my-5">

        <BaseMiniList v-if="publisherStore.publisher?.publications?.length"
            title="Publications"
            :icon="icons.publications"
            :items="publisherStore.publisher?.publications"
            :navigateObject="() => $router.push({ name: 'AdminPublications' })"
            :navigateItem="(item) => $router.push({ name: 'AdminPublication', params: { id: item.id } })"
        />
    </div>
</template>

<script setup>
import { usePublisherStore } from '../../stores/publishers';
import { useRoute } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { updatePublisherRules } from '../../forms/validations/updatePublisherRules';
import { icons } from '../../utils/icons';
import { updateSchemas } from '../../forms/schema';
import AdminTopActions from '../../components/AdminTopActions.vue';
import AdminObjectsBasicInfoCard from '../../components/AdminObjectsBasicInfoCard.vue';
import BaseMiniList from '../../components/BaseMiniList.vue';
import AdminObjectUpdateForm from '../../components/AdminObjectUpdateForm.vue';

const publisherStore = usePublisherStore();
const route = useRoute();
const { openModal } = useConfirmationModal();

const id = route.params.id;
const dataLoaded = ref(false);

const updateForm = ref(null);

const schema = updateSchemas.publisher();
const rules = computed(() => {
    return updatePublisherRules();
});

async function fetchPublisher() {
    await publisherStore.getPublisher(id);
    document.title = `Publisher - ${publisherStore.publisher.name}`;
    dataLoaded.value = true;
}

onMounted(async() => {
    await fetchPublisher();
});

const updatePublisher = () => {
    if (updateForm.value) {
        updateForm.value.onSubmit();
    }
};

async function deletePublisher() {
    const confirmed = await openModal();
    if (!confirmed) return;

    await publisherStore.deletePublisher(id);
}
</script>
