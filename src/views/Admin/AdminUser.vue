<template>
    <div>
        <AdminTopActions :updateAction="updateUser" :deleteAction="deleteUser" />

        <h1 class="admin-title capitalize">{{ adminStore.user?.first_name }} {{ adminStore.user?.last_name }}</h1>

        <hr class="my-5">
        
        <AdminObjectsBasicInfoCard :object="adminStore.user" />

        <div>
            <button>Send Forgot Password</button>
        </div>

        <hr class="my-5">

        <div class="text-normal">You can update this user basic information</div>

        <AdminObjectUpdateForm 
            v-if="dataLoaded"
            ref="updateForm" 
            type="user"
            :schema="schema" 
            :validationRules="rules" 
            :initialData="adminStore.user"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { useRoute } from 'vue-router';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import AdminTopActions from '../../components/AdminTopActions.vue';
import AdminObjectsBasicInfoCard from '../../components/AdminObjectsBasicInfoCard.vue';
import { updateUserRules } from '../../forms/validations/updateUserRules';
import AdminObjectUpdateForm from '../../components/AdminObjectUpdateForm.vue';
import { updateSchemas } from '../../forms/schema';

const adminStore = useAdminStore();
const route = useRoute();
const { openModal } = useConfirmationModal();

const id = route.params.id;
const dataLoaded = ref(false);
const updateForm = ref(null);

const schema = updateSchemas.user();
const rules = computed(() => {
    return updateUserRules();
});

onMounted(async () => {
    await adminStore.getUser(id);
    document.title = `User - @${adminStore.user.username}`;
    dataLoaded.value = true;
});

const updateUser = () => {
    if (updateForm.value) {
        updateForm.value.onSubmit();
    }
};

async function deleteUser() {
    const confirmed = await openModal();
    if (!confirmed) return;

    await adminStore.deleteUser(id);
}
</script>