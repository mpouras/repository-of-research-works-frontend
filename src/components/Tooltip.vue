<template>
    <div class="relative flex items-center group">
        <slot></slot>

        <div 
            class="absolute hidden group-hover:flex group-focus-within:flex items-center w-36 md:w-48"
            :class="tooltipPosition"
        >
            <span class="relative z-10 p-2 text-xs text-white bg-black rounded-md shadow-lg w-full">
                {{ text }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    text: String,
    position: { type: String, default: "left" }
});

const tooltipPosition = computed(() => {
    return props.position === "right"
        ? "left-6 top-1/2 -translate-y-1/2"
        : "right-6 top-1/2 -translate-y-1/2";
});
</script>