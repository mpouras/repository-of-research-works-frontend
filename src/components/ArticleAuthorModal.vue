<template>
    <TransitionRoot appear :show="isOpen" as="template" v-if="isOpen">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-transparent" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="component-title">
                                {{ author?.name }}
                            </DialogTitle>
                            <div class="mt-2 flex flex-col">
                                <hr>
                                <div v-if="author?.university" class="component-title-tertiary-sm">
                                    {{ author.university }}
                                </div>
                                <hr>
                                <a v-if="author?.profile_link" :href="author.profile_link" target="_blank"
                                    class="text-sm link-text">
                                    <i :class="icons.link"></i>
                                    {{ getHostnameByUrl(author.profile_link) }}
                                </a>
                                <a v-if="author?.orcid_link" :href="author.orcid_link" target="_blank"
                                    class="text-sm link-text">
                                    <i :class="icons.link"></i>
                                    {{ getHostnameByUrl(author.orcid_link) }}
                                </a>

                            </div>
                            <router-link :to="{ name: 'Author', params: { id: author?.id } }"
                                class="primary-button">
                                View Author
                            </router-link>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import { getHostnameByUrl } from '../utils/urls.js';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { icons } from '../utils/icons.js';

const isOpen = ref(false);
const author = ref(null);

function openModal(selectedAuthor) {
  author.value = selectedAuthor;
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
  author.value = null;
}

defineExpose({ openModal });
</script>


<style scoped></style>