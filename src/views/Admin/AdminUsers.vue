<template>
    <div>
        <h1 class="admin-title">Users</h1>
        <div v-if="errors.error">
            {{ errors }}
        </div>

        <div class="flex flex-row justify-between items-center my-4">
            <div class="text-normal">Manage your users</div>
            <button @click="$router.push({ name: 'AdminCreateObject' , params: { type: 'user' }})"
                class="primary-button">Add User</button>
        </div>

        <div v-if="users.length" class="grid grid-cols-1">

            <SearchBar :onSearch="handleSearch"/>

            <div class="flex flex-col items-start sm:flex-row justify-between md:items-center">
                <ListRange :listType="'users'" />
                <SortSelect :paginate="true" :sort="true" type="users"/>
            </div>

            <div class="table-container">
                <table class="table-style">
                    <thead>
                        <tr class="bg-gray-100">
                            <th scope="col" class="table-title"> ID </th>
                            <th scope="col" class="table-title"> Full Name </th>
                            <th scope="col" class="table-title"> Email </th>
                            <th scope="col" class="table-title"> Username </th>
                            <th scope="col" class="table-title"> Join Date </th>
                            <th scope="col" class="table-title"> Role </th>
                            <th scope="col" class="table-title"> Status </th>
                            <th scope="col" class="table-title"> Actions </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-300 ">
                        <tr v-for="user in users" :key="user.id"
                            class="bg-white transition-all duration-500 hover:bg-gray-50">
                            <td class="table-item"> {{ user.id }} </td>
                            <td class="table-item capitalize max-w-xs truncate"> {{ user.first_name }} {{ user.last_name }} </td>
                            <td class="table-item"> {{ user.email }}</td>
                            <td class="table-item"> @{{ user.username }}</td>
                            <td class="table-item"> {{ formatDate(user.created_at) }} </td>
                            <td class="table-item capitalize"> {{ user.role }} </td>
                            <td class="table-item">
                                <div :class="`badge-status-${user.status}`">
                                    <i :class="icons.status"></i>
                                    <span class="font-medium text-xs capitalize">{{ user.status }}</span>
                                </div>
                            </td>
                            <td class="flex p-5 items-center justify-center gap-0.5">
                                <button @click="navigateToUser(user.id)" class="table-button group hover:bg-orange-600">
                                    <i :class="[icons.editUser, 'text-xl text-orange-500 group-hover:text-white']"></i>
                                </button>

                                <button @click="deleteUser(user.id)" class="table-button group hover:bg-red-600">
                                    <i :class="[icons.delete, 'text-xl text-red-500 group-hover:text-white']"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <PaginationBar />
        </div>

        <div v-else>
            Not Found
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { formatDate } from '../../utils/dates';
import { useRoute, useRouter } from 'vue-router';
import { useConfirmationModal } from '../../composables/useConfirmationModal';
import { icons } from '../../utils/icons';
import ListRange from '../../components/ListRange.vue';
import SearchBar from '../../components/SearchBar.vue';
import PaginationBar from '../../components/PaginationBar.vue';
import SortSelect from '../../components/SortSelect.vue';
import { useQueryParamsStore } from '../../stores/queryParams';

const adminStore = useAdminStore();
const router = useRouter();
const route = useRoute();
const { openModal } = useConfirmationModal();
const { queryParams } = useQueryParamsStore();

const users = ref({});
const errors = ref({});

const fetchUsers = async () => {
    await adminStore.getUsers({
        query: route.query.query || undefined,
        ...queryParams
    });
    
    users.value = adminStore.users;
    errors.value = adminStore.errors;
};

watch(() => adminStore.users, (newUsers) => {
    users.value = newUsers;
}, { deep: true });

watch(queryParams, () => {
    fetchUsers();
}, { deep: true });

onMounted(async() => {
    fetchUsers();
});

function navigateToUser(id) {
    router.push({ name: 'AdminUser', params: { id } })
};

async function deleteUser(userId) {
    const confirmed = await openModal();
    if (!confirmed) return;

    await adminStore.deleteUser(userId);
}

async function handleSearch(query) {
    router.push({ query: { query: query || undefined }})
}

watch(() => route.query.query, (newQuery) => {
    if (newQuery !== undefined) {
        fetchUsers();
    }
}, { immediate: true });
</script>