<template>
    <button 
        @click="$router.push({ 
            name: 'AdminCreateObject',
            params: { type: 'volume' },
            query: { publication_id: props.publicationId } 
        })" 
        class="primary-button"
    >
        <i :class="icons.volumes"></i>
        Add Volume
    </button>

    <div v-if="props.volumes?.length">
        <TabGroup>
            <TabList class="tab-container">
                <Tab v-for="volume in volumes" 
                    as="template" 
                    :key="volume.id" 
                    v-slot="{ selected }"
                >
                    <button @click="selectedVolume = volume" :class="[selected ? 'tab-button-selected' : 'tab-button-inselected']">
                        {{ volume.year_published }}
                    </button>
                </Tab>
            </TabList>
        
            <TabPanels>
                <div>
                    <div v-if="selectedVolume">
                        <h1 class="admin-title-secondary text-center my-4">Volume</h1>

                        <div class="flex flex-row space-y-1 justify-between border-2 border-gray-500 bg-white px-4 py-2 rounded-md text-sm my-2">
                            <div class="flex flex-col">
                                <div><span class="font-thin">ID:</span> {{ selectedVolume.id }}</div>
                                <div><span class="font-thin">Number:</span> {{ selectedVolume.number }}</div>
                                <div><span class="font-thin">Year:</span> {{ selectedVolume.year_published }}</div>
                            </div>

                            <BaseActionsDropdown :deleteAction="() => deleteVolume(selectedVolume.id)"/>
                        </div>

                        <h1 class="admin-title-secondary text-center my-4">Issues</h1>
                        
                        <button 
                            @click="$router.push({ 
                                name: 'AdminCreateObject',
                                params: { type: 'issue'},
                                query: { 
                                    publication_id: props.publicationId,
                                    volume_number: selectedVolume.number
                                }
                            })" 
                            class="primary-button"
                        >
                            <i :class="icons.issues"></i>
                            Add Issue
                        </button>

                        <div v-if="issues.length">
                        
                            <div>
                                <div v-for="issue in issues":key="issue.id"
                                    class="relative inline-flex gap-2 items-start border-2 border-gray-500 bg-white px-4 py-2 rounded-md text-sm my-2 mr-2"
                                >
                                    <div class="flex flex-col">
                                        <div><span class="font-thin">ID:</span> {{ issue.id }}</div>
                                        <div><span class="font-thin">Number:</span> {{ issue.name }}</div>
                                        <div><span class="font-thin">Month:</span> {{ getMonthName(issue.month_published) }}</div>
                                        <!-- <div><span class="font-thin">Month:</span> {{ issue.month_published }}</div> -->
                                    </div>
                                    
                                    <BaseActionsDropdown :deleteAction="() => deleteIssue(issue.id)" />
                                </div>
                            </div>
                        </div>

                        <section v-else>
                            Not Found
                        </section>
                    </div>

                </div>
            </TabPanels>
        </TabGroup>
    </div>

    <div v-else>
        Not Found
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { TabGroup, TabList, Tab, TabPanels } from '@headlessui/vue'
import { useIssueStore } from '../stores/issues';
import { icons } from '../utils/icons';
import BaseActionsDropdown from './BaseActionsDropdown.vue';
import { getMonthName } from '../utils/dates';

const props = defineProps({
    publicationId: Number,
    volumes: Object,
})

const issueStore = useIssueStore();

const issues = ref({});
const selectedVolume = ref(null);

const fetchIssues = async (volume) => {
    if (volume) {
        issues.value = [];
        await issueStore.getIssues(props.publicationId, volume.number);
        issues.value = issueStore.issues;
    }
};

onMounted(async () => {
    if (Array.isArray(props.volumes) && props.volumes.length > 0) {
        selectedVolume.value = props.volumes[0]; 
        await fetchIssues(selectedVolume.value);
    }
});

watch(() => props.volumes, async (newVolumes) => {
    if (Array.isArray(newVolumes) && newVolumes.length > 0 && !selectedVolume.value) {
        selectedVolume.value = newVolumes[0];
        await fetchIssues(selectedVolume.value);
    }
}, { immediate: true });

watch(selectedVolume, async (newVolume) => {
    await fetchIssues(newVolume);
});

function deleteVolume(id) {
    console.log(id)
}

function deleteIssue(id) {
    console.log(id)
}
</script>