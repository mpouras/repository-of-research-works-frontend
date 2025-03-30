<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-50" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h1" class="component-title-secondary-sm"> Confirmation Required </DialogTitle>

                            <div class="text-normal mt-4">You must enter the required information to complete your action.</div>

                            <div class="mt-4" v-for="(value, key) in form" :key="key">
                                <label :for="key" class="block text-gray-700 capitalize">{{ key.replace('_', ' ') }}</label>
                                <input 
                                    :id="key" 
                                    :type="fieldTypes[key] || 'text'"
                                    v-model="form[key]" 
                                    class="input-field" 
                                    :placeholder="`Enter your ${key}`" 
                                />
                                <p v-if="v$[key] && v$[key].$error" class="input-form-error">
                                    {{ v$[key].$errors[0]?.$message }}
                                </p>
                            </div>

                            <div class="mt-5 flex justify-end space-x-2">
                                <button class="primary-button" @click="closeModal">Cancel</button>
                                <button class="secondary-button" @click="submitForm">Submit</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useVerificationModal } from '@/composables/useVerificationModal';

const { isOpen, form, fieldTypes, v$, closeModal, submitForm } = useVerificationModal();
</script>