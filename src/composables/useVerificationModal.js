import { ref, computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';

const isOpen = ref(false);
const resolveCallback = ref(null);
const form = reactive({});
const fieldTypes = reactive({});
const rules = reactive(({}));

export function useVerificationModal() {
    let v$ = useVuelidate(rules, form);

    function openModal(fields) {
        isOpen.value = true;
        Object.keys(form).forEach((key) => delete form[key]);
        Object.keys(fieldTypes).forEach((key) => delete fieldTypes[key]);

        fields.forEach(({ name, type = 'text', validators }) => {
            form[name] = '';
            fieldTypes[name] = type;
            rules[name] = validators;
        });

        return new Promise((resolve) => {
            resolveCallback.value = resolve;
        });
    }

    function closeModal() {
        isOpen.value = false;
        resolveCallback.value(null);
    }

    async function submitForm() {
        const isValid = await v$.value.$validate();

        if (!isValid) {
            return;
        }

        isOpen.value = false;
        resolveCallback.value(form);
    }

    return {
        isOpen,
        form,
        fieldTypes,
        v$,
        openModal,
        closeModal,
        submitForm,
    };
}
