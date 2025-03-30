<template>
    <div>
        <input 
            type="checkbox" 
            class="peer sr-only opacity-0" 
            :id="id"
            :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)"
        />
        <label 
            class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-orange-500 peer-checked:before:translate-x-full"
            :for="id"
        >
            <span class="sr-only">Enable</span>
        </label>
    </div>
</template>

<script setup>
defineProps({
    modelValue: Boolean,
    id: String
});

defineEmits(['update:modelValue']);
</script>

<style scoped>

</style>