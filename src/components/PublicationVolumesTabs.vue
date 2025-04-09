<template>
    <div class="w-full my-10">

        <div class="component-title-secondary">Volumes and Issues</div>

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
                        <div class="component-title-tertiary">
                            Volume {{ selectedVolume.number }}, {{ selectedVolume.year_published }}
                        </div>
                    </div>
                    
                    <div v-for="issue in issues" class="tab-panel">
                        <ul class="tab-panel-list">
                            <li class="tab-panel-item">
                                <div class="text-md font-semibold text-blue-700 leading-5">
                                    Issue {{ issue.name }}
                                </div>

                                <div class="mt-1 flex items-center space-x-1 text-xs font-normal leading-4 text-gray-500 gap-1">
                                    Month published
                                    <div>&middot;</div>
                                    <span class="px-2 py-0.5 rounded-md font-semibold bg-orange-100">{{ getMonthName(issue.month_published) }}</span>
                                    <!-- <span class="px-2 py-0.5 rounded-md font-semibold bg-orange-100">{{ issue.month_published }}</span> -->
                                </div>

                                <router-link :to="{ name: 'Issue', params: { publicationId: issue.publication_id, volumeNumber: issue.volume_number, issueName: issue.name }}" 
                                    class="absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2" 
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </TabPanels>
        </TabGroup>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { TabGroup, TabList, Tab, TabPanels } from '@headlessui/vue'
import { useIssueStore } from '../stores/issues';
import { getMonthName } from '../utils/dates';

const props = defineProps(['publicationId', 'volumes']);

const issueStore = useIssueStore();

const issues = ref({});
const selectedVolume = ref(null);

watch(selectedVolume, async (newVolume) => {
    if (newVolume) {
        issues.value = {};
        await issueStore.getIssues(props.publicationId, newVolume.number);
        issues.value = issueStore.issues;
    }
});

onMounted(() => {
    selectedVolume.value = props.volumes[0];
    console.log(selectedVolume.value);
});
</script>