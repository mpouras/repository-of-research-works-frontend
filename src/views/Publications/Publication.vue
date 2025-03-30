<template>
    <div class="page">
        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div v-else-if="publication && Object.keys(publication).length > 0" class="page">
            <div class="relative">
                <div class="component-title-primary">
                    {{ publication.title }}
                </div>
            </div>

            <div class=" my-3 flex flex-wrap gap-2 items-center">
                <i :class="icons.publishers"></i>
                <p v-for="publisher in publication.publishers"
                    class="px-2 py-0.5 rounded-md text-xs md:text-sm md:font-bold bg-orange-100">
                    {{ publisher.name.toUpperCase() }}
                </p>
            </div>

            <div v-if="publication.issn && publication.year_published" class="flex flex-row gap-1">
                ISSN
                <span class="px-2 py-0.5 rounded-md text-sm bg-gray-200 ">{{ publication.issn }}</span>
                <div>&middot;</div>
                Year Published:
                <span class="px-2 py-0.5 rounded-md text-sm bg-gray-200 ">{{ publication.year_published }}</span>
            </div>

            <div class="py-3">
                <div class="component-title-secondary">Description</div>
                {{ publication.description }}
            </div>

            <PublicationVolumesTabs v-if="publication.volumes?.length" :publicationId="publication.id" :volumes="publication.volumes"/>
        </div>

        <div v-else>
            Not Found
        </div>

    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { usePublicationStore } from '../../stores/publications';
import PublicationVolumesTabs from '../../components/PublicationVolumesTabs.vue';
import { icons } from '../../utils/icons';

const route = useRoute();
const publicationStore = usePublicationStore();

const publication = ref({});
const errors = ref({});
const id = route.params.id;

async function fetchPublication() {
    await publicationStore.getPublication(id);
    publication.value = publicationStore.publication;
    errors.value = publicationStore.errors;
}

onMounted(() => {
    fetchPublication();
});
</script>