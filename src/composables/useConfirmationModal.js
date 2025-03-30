import { ref } from 'vue';

const isOpen = ref(false);
const resolveCallback = ref(null);

export function useConfirmationModal() {
    function openModal() {
        isOpen.value = true;
        return new Promise((resolve) => {
            resolveCallback.value = resolve;
        });
    }

    function closeModal() {
        isOpen.value = false;
        resolveCallback.value(false);
    }

    function confirmModal() {
        isOpen.value = false;
        resolveCallback.value(true);
    }

    return {
        isOpen,
        openModal,
        closeModal,
        confirmModal,
    };
}
