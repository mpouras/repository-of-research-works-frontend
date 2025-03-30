<template>
    <div>
        <AdminTopActions :updateAction="updatePublication" :deleteAction="deletePublication"/>

        <h1 class="admin-title capitalize">{{ publicationStore.publication?.title }}</h1>

        <hr class="my-5">

        <AdminObjectsBasicInfoCard :object="publicationStore.publication" /> 
        
        <hr class="my-5">

        <AdminObjectUpdateForm 
            v-if="dataLoaded"
            ref="updateForm" 
            type="publication"
            :schema="schema" 
            :validationRules="rules" 
            :initialData="publicationStore.publication"
        />

        <section class="grid grid-cols-1">

            <div>
                <h1 class="text-xl text-center font-bold mb-4 uppercase">Publishers</h1>
                <hr class="my-5">

                <AdminObjectsReferenceSection :object="'publisher'" :objectList="publicationStore.publication?.publishers" @refresh="fetchPublication"/>

                <hr class="my-5">
            </div>

            <div>
                <h1 class="text-xl text-center font-bold mb-4 uppercase">Volumes And Issues</h1>
                <hr class="my-5">

                <AdminPublicationVolumesTabs :publicationId="publicationStore.publication?.id" :volumes="publicationStore.publication?.volumes"/>
            </div>
        </section>

    </div>
</template>

<script setup>
import { usePublicationStore } from '../../stores/publications';
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { updatePublicationRules } from '../../forms/validations/updatePublicationRules';
import AdminTopActions from '../../components/AdminTopActions.vue';
import AdminObjectsBasicInfoCard from '../../components/AdminObjectsBasicInfoCard.vue';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import AdminPublicationVolumesTabs from '../../components/AdminPublicationVolumesTabs.vue';
import AdminObjectsReferenceSection from '../../components/AdminObjectsReferenceSection.vue';
import AdminObjectUpdateForm from '../../components/AdminObjectUpdateForm.vue';
import { updateSchemas } from '../../forms/schema';

const publicationStore = usePublicationStore();
const route = useRoute();
const { openModal } = useConfirmationModal();

const id = route.params.id;
const dataLoaded = ref(false);
const updateForm = ref(null);

const schema = updateSchemas.publication();
const rules = computed(() => {
    return updatePublicationRules();
});

async function fetchPublication() {
    await publicationStore.getPublication(id);
    document.title = `Publication - ${publicationStore.publication.title}`;
    dataLoaded.value = true;
}

onMounted(async() => {
    await fetchPublication();
});

const updatePublication = () => {
    if (updateForm.value) {
        updateForm.value.onSubmit();
    }
};

async function deletePublication() {
    const confirmed = await openModal();
    if (!confirmed) return;

    await publicationStore.deletePublication(id);
}
</script>