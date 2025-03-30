<template>
    <div class="page">
        <div v-if="errors.error">
            {{ errors }}
        </div>
        
        <div v-if="publications">
            <RouteTitle>Publications</RouteTitle>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'publications'" />
                <SortSelect :paginate="true" :sort="true" type="publications"/>
            </div>
            
            <div class="list-box">
                <div v-for="publication in publications" :key="publication.id" class="list-box-item">

                    <router-link 
                        :to="{ name: 'Publication', params: { id: publication.id }}"
                        class="component-title-primary-md"
                    >
                        {{ publication.title }}
                    </router-link>

                    <div>
                        <div class=" my-1 flex flex-wrap gap-2 items-center">
                            <p class="px-2 py-0.5 rounded-md text-sm font-semibold bg-blue-100 dark:bg-gray-600">
                                {{ publication.type }}
                            </p>

                            <div>&middot;</div>

                            <span class="text-sm text-gray">Year Published</span>
                            <p class="px-2 py-0.5 rounded-md text-sm font-semibold bg-gray-100 dark:bg-gray-600">
                                {{ publication.year_published }}
                            </p>
                        </div>

                        <div class=" my-1 flex flex-wrap gap-2 items-center">
                            <i :class="[icons.publishers]"></i>
                            <p v-for="publisher in publication.publishers"
                                class="px-2 py-0.5 rounded-md text-sm bg-orange-100 dark:bg-gray-600">
                                {{ publisher.name }}
                            </p>
                        </div>
                        
                    </div>

                    <div class="line-clamp-3">
                        {{ publication.description }}
                    </div>

                    <router-link
                        :to="{ name: 'Publication', params: { id: publication.id }}"
                        class="secondary-button-wide"
                    >
                        Read more 
                    </router-link>
                </div>
            </div>

            <PaginationBar />
        </div>

        <div v-else>
            Error
        </div>
    </div>

    
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { usePublicationStore } from "@/stores/publications";
import RouteTitle from "../../components/RouteTitle.vue";
import PaginationBar from "../../components/PaginationBar.vue";
import ListRange from "../../components/ListRange.vue";
import { icons } from "../../utils/icons";
import { useQueryParamsStore } from "../../stores/queryParams";
import SortSelect from "../../components/SortSelect.vue";

const publicationStore = usePublicationStore();
const { queryParams } = useQueryParamsStore();

const publications = ref([]);
const errors = ref({});

const fetchPublications = async () => {
    await publicationStore.getPublications(queryParams);
    publications.value = publicationStore.publications;
    errors.value = publicationStore.errors;
};

onMounted(() => {
    fetchPublications();
});

watch(queryParams, () => {
    fetchPublications();
});
</script>

<style scoped></style>