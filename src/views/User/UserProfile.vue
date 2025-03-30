<template>
    <div class="page">
        <div class="list-box">
            <div class="list-box-item">

                <div class="flex flex-col md:flex-row">
                    <div class="md:w-1/3 text-center m-8 md:mb-0">
                        <img class="profile-image"
                            :src="userStore.user.photo || defaultUserImage"
                            alt="User profile picture"
                        />
                        <router-link :to="{ name: 'User Edit Profile' }" class="primary-button">Edit Profile</router-link>
                    </div>

                    <div class="md:w-2/3 md:pl-8">
                        <p class="component-title-primary-md">{{ user.first_name }} {{ user.last_name }}</p>
                        <div class="my-2 py-1 px-3 inline-block rounded-md text-white bg-gradient-to-r from-orange-200 with-orange-400 to-orange-500 text-xl font-bold">@{{ user.username }}</div>

                        <div v-if="user.bio" class="my-3 border-4 rounded-lg p-2">
                            {{ user.bio }}
                        </div>

                        <p class="text-thin">Member since: {{ formatDate(user.created_at) }}</p>

                        <h2 class="component-title-tertiary">User Information</h2>

                        <ul class="space-y-2 text-gray-700 font-semibold">
                            <li class="flex items-center">
                                <span class="text-thin pr-2">Age: </span> {{ user.birthday ? calculateAge(user.birthday) : 'Not specified yet' }}
                            </li>
                            <li class="flex items-center">
                                <span class="text-thin pr-2">Gender: </span> {{ user.gender ?? 'Not specified yet' }}
                            </li>
                            <li class="flex items-center">
                                <i class="mdi mdi-email text-xl pr-2"></i>
                                <span :class="{'text-red-400 font-bold' : user.email_verified_at === null}">{{ user.email }}</span>

                                <Tooltip v-if="user.email_verified_at === null" text="Your email is not verified yet." position="right">
                                    <i class="mdi mdi-help-circle text-red-500"></i>
                                </Tooltip>

                                <Tooltip v-else text="Your email is verified." position="right">
                                    <i class="mdi mdi-check-circle text-green-500"></i>
                                </Tooltip>

                            </li>
                            <li v-if="user.country" class="flex items-center">
                                <i class="mdi mdi-map-marker text-xl pr-2"></i>
                                {{ user.country }}
                            </li>
                            <li v-if="user.linkedin_url" class="flex items-center">
                                <i class="mdi mdi-linkedin text-xl pr-2"></i>
                                <a :href="user.linkedin_url" target="_blank">{{ getHostnameByUrl(user.linkedin_url) }}</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { formatDate } from '../../utils/dates';
import { getHostnameByUrl } from '../../utils/urls';
import { calculateAge } from '../../utils/dates';
import defaultUserImage from '@/assets/default-user.png'
import Tooltip from '../../components/Tooltip.vue';

const userStore = useUserStore();

const user = ref({});

const fetchUser = async () => {
    await userStore.getUser();
    user.value = userStore.user;
}

onMounted(() => {
    fetchUser();
});
</script>

<style scoped>

</style>