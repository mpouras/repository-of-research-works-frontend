<template>
    <div class="page">
        <RouteTitle>Edit User Profile</RouteTitle>

        <div class="list-box">
            <div class="form-box">
                <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
                    <!-- Profile Picture -->
                    <div class="flex flex-row justify-center mb-5 items-start">
                        <div class="text-center">
                            <div>
                                <img class="profile-image"
                                    :src="userStore.user.photo || defaultUserImage"
                                    alt="User profile picture"
                                />
                                <input type="file" name="profile" id="upload_photo" hidden @change="handlePhotoUpload" accept="image/*" />
                                <label for="upload_photo" class="inline-flex items-center cursor-pointer">
                                    <i :class="icons.addPhoto"></i>
                                </label>
                            </div>
                            <button type="button" class="secondary-button" @click="triggerFileUpload">Change Profile Picture</button>
                        </div>
                    </div>

                    <!-- First Name -->
                    <div class="mb-4">
                        <label for="first_name" class="block text-gray-700">First Name</label>
                        <input id="first_name" type="text" v-model="form.first_name" class="input-field" :class="{'error-input': v$.first_name.$error}" />
                        <div v-if="v$.first_name.$error" class="input-form-error">{{ v$.first_name.$errors[0]?.$message }}</div>
                    </div>

                    <!-- Last Name -->
                    <div class="mb-4">
                        <label for="last_name" class="block text-gray-700">Last Name</label>
                        <input id="last_name" type="text" v-model="form.last_name" class="input-field" :class="{'error-input': v$.last_name.$error}" />
                        <div v-if="v$.last_name.$error" class="input-form-error">{{ v$.last_name.$errors[0]?.$message }}</div>
                    </div>

                    <!-- Username -->
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700">Username</label>
                        <input id="username" type="text" v-model="form.username" class="input-field" :class="{'error-input': v$.username.$error}" />
                        <div v-if="v$.username.$error" class="input-form-error">{{ v$.username.$errors[0]?.$message }}</div>
                    </div>

                    <!-- Bio -->
                    <div class="mb-4">
                        <label for="bio" class="block text-gray-700">
                            Bio 
                            <span v-if="isBioActive"> ({{ form.bio?.length || 0 }}/100) </span>
                            <i v-if="isBioActive && form.bio?.length > 0 && form.bio?.length <= 100" class="mdi mdi-check text-green-500"></i>
                            <i v-else-if="isBioActive && form.bio?.length > 100" class="mdi mdi-close text-red-500"></i>
                        </label>

                        <textarea 
                            id="bio" 
                            v-model="form.bio" 
                            class="input-field" 
                            rows="3" 
                            placeholder="Tell us something about yourself.." 
                            :class="{'error-input': v$.bio.$error}"
                            @focus="isBioActive = true"
                            @blur="isBioActive = false"
                        >
                        </textarea>
                        <div v-if="v$.bio.$error" class="input-form-error">{{ v$.bio.$errors[0]?.$message }}</div>
                    </div>

                    <!-- Birthday -->
                    <div class="mb-4">
                        <label for="birthday" class="block text-gray-700">Birthday</label>
                        <datepicker
                            v-model="form.birthday"
                            date-picker 
                            :min-date="new Date(1900, 0, 1)" 
                            :max-date="new Date()" 
                            :enable-time-picker="false"
                            format="dd-MM-yyyy"
                            class="input-field"
                            placeholder="Select your birthday"
                        />
                        <div v-if="v$.birthday.$error" class="input-form-error">{{ v$.birthday.$errors[0]?.$message }}</div>
                    </div>

                    <!-- Gender -->
                    <div class="mb-4">
                        <label for="gender" class="block text-gray-700">Gender</label>
                        <select id="gender" v-model="form.gender" class="input-field" :class="{'error-input': v$.gender.$error}">
                            <option value="null">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div v-if="v$.gender.$error" class="input-form-error">{{ v$.gender.$errors[0]?.$message }}</div>
                    </div>

                    <!-- Country -->
                    <div class="mb-4">
                        <label for="country" class="block text-gray-700">Country</label>
                        <select id="country" v-model="form.country" class="input-field" :class="{'error-input': v$.country.$error}">
                            <option value="null">Select country</option>
                            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                        </select>
                        <div v-if="v$.country.$error" class="input-form-error">{{ v$.country.$errors[0]?.$message }}</div>
                    </div>

                    <!-- Linkedin URL -->
                    <div class="mb-4">
                        <label for="linkedin_url" class="text-gray-700">
                            Linkedin URL 
                            <i :class="icons.linkedin"></i>
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <span class="input-field-start-half">https://www.linkedin.com/in/</span>
                            <input id="linkedin_url" type="text" v-model="form.linkedin_url" class="input-field-end-half" />
                            <div v-if="v$.linkedin_url.$error" class="input-form-error">{{ v$.linkedin_url.$errors[0]?.$message }}</div>
                        </div>
                    </div>

                    <!-- Buttons -->
                     <div class="flex flex-row justify-end gap-2">
                        <button type="button" class="primary-button-lg" @click="cancelUpdate">Cancel</button>
                        <button type="submit" class="secondary-button-lg">Update Profile</button>
                     </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, onMounted, ref } from 'vue';
import { getAllCountries } from '../../utils/countries.js';
import Datepicker from '@vuepic/vue-datepicker';
import { useUserStore } from '../../stores/user';
import useVuelidate from '@vuelidate/core';
import RouteTitle from '../../components/RouteTitle.vue';
import { formatDateWithDash } from '../../utils/dates.js';
import router from '../../router/index.js';
import defaultUserImage from '@/assets/default-user.png'
import { icons } from '../../utils/icons.js';
import { userUpdateProfileRules } from '../../forms/validations/userUpdateProfileRules.js';
import { useToastStore } from '../../stores/toasts.js';
import { checkFormChanges, createFormData } from '../../forms/helpers.js';

const userStore = useUserStore();

const form = reactive({});
const initialFormState = ref({});

const isBioActive = ref(false);
const countries = ref([]);

onMounted(async () => {
    countries.value = await getAllCountries();
    
    await userStore.getUser();

    const { first_name, last_name, username, bio, birthday, gender, linkedin_url, country  } = userStore.user;

    const linkedinUrlWithoutHttp = linkedin_url?.replace('https://www.linkedin.com/in/', '');
    Object.assign(form, { first_name, last_name, username, bio, birthday, gender, linkedin_url: linkedinUrlWithoutHttp, country, photo: null });
    Object.assign(initialFormState.value, form);
});

const rules = computed(() => {
    return userUpdateProfileRules();
});

const v$ = useVuelidate(rules, form);

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        form.photo = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            document.querySelector('.profile-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function triggerFileUpload() {
    document.getElementById('upload_photo').click();
}

function cancelUpdate() {
    router.back();
}

async function handleSubmit() {
    const result = await v$.value.$validate();
    if (!result) return;

    const updatedFields = checkFormChanges(form, initialFormState);

    if (Object.keys(updatedFields).length > 0) {
        if (updatedFields.linkedin_url) {
            updatedFields.linkedin_url = `https://www.linkedin.com/in/${updatedFields.linkedin_url}`;
        }

        if(updatedFields.birthday) {
            updatedFields.birthday = formatDateWithDash(new Date(updatedFields.birthday));
        }

        const formData = createFormData(updatedFields);

        await userStore.updateUser(formData);
    } else {
        useToastStore().showInstantToast("No changes detected.", 'info');
    }
}
</script>

<style scoped></style>
