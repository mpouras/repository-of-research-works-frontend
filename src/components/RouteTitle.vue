<template>
    <div class="relative my-5 ms-2 md:ms-0 text-start inline-block md:text-center">
        <span class="text-2xl md:text-3xl font-bold relative uppercase">
            <slot></slot> 
            <span class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
        </span>
    </div>
</template>

<script setup>

</script>