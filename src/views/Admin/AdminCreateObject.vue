<template>
    <AdminTopActions />

    <h1 class="admin-title capitalize">Create {{ objectType }}</h1>

    <section v-for="(value, key) in defaultValues" :key="key" class="inline-flex">
        <p v-if="value !== null" class="mr-4">
            <span class="capitalize mr-2">{{ key.replace('_', ' ') }}</span>
            <span>{{ value }}</span>
            <i :class="[icons.close, 'cursor-pointer']" @click="defaultValues[key] = null"></i>
        </p>
    </section>

    <section v-if="schema.requirements && Object.keys(schema.requirements).some(req => defaultValues[ schema.requirements[req].result ] === null)">
        <div v-for="req in schema.requirements">
            <AdminObjectsSyncForm 
                v-if="defaultValues[req.result] === null && (req.requires || []).every(r => defaultValues[r] !== null)"
                :type="req.object" 
                :schema="req" 
                :defaultValues="defaultValues"
                :onSubmit="(result) => attachItem(req, result)"
            />
        </div>
    </section>

    <AdminObjectsCreateForm
        v-else
        :schema="schema" 
        :validationRules="validationRules" 
        :onSubmit="handleCreateObject"
    />

</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { createSchemas } from "../../forms/schema";
import { createValidations } from "../../forms/validations";
import { create } from "../../forms/actions/create";
import AdminTopActions from "../../components/AdminTopActions.vue";
import AdminObjectsCreateForm from "../../components/AdminObjectsCreateForm.vue";
import AdminObjectsSyncForm from "../../components/AdminObjectsSyncForm.vue";
import { icons } from "../../utils/icons";

const route = useRoute();
const objectType = route.params.type;

const schema = createSchemas[objectType] ? createSchemas[objectType]() : {};
const validationRules = createValidations[objectType] || {};

const defaultValues = ref({
    publication_id: route.query.publication_id || null,
    volume_number: route.query.volume_number || null,
    issue_name: route.query.issue_name || null,
});

async function handleCreateObject(formData) {
    const { publication_id, volume_number, issue_name } = defaultValues.value;

    await create[objectType](formData, publication_id, volume_number, issue_name);
};

const attachItem = (object, result) => {
    const data = schema.requirements[object.object].data(result);
    defaultValues.value[object.result] = data;
};
</script>