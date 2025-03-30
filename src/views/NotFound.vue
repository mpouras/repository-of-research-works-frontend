<template>
  <div class="page">
    <div class="text-center flex flex-col items-center p-8 w-full">
      <h1 class="text-4xl font-bold mb-4">404 Not Found</h1>
      <p class="mb-4">Sorry, the page you are looking for does not exist.</p>
      <router-link :to="{ name: 'Home'}" class="text-blue-500 hover:underline">Go to Home</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped></style>