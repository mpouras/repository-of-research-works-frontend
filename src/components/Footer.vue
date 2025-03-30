<template>
    <footer class="footer-center w-full p-4 bg-gray-800  text-white">
      <div class="text-center">
        <p>
          Copyright © {{ currentYear }} -
          <a class="font-semibold" href="">Stelios Mparmpounis</a>
        </p>
      </div>
    </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
</style>