<template>
   <div class="flex flex-col">

      <HomeHero />
      
      <HomeLatestArticles />

      <HomeKeywordsContainer />
   </div>
</template>

<script setup>
import HomeLatestArticles from '../components/HomeLatestArticles.vue';
import HomeKeywordsContainer from '../components/HomeKeywordsContainer.vue';
import HomeHero from '../components/HomeHero.vue';
</script>

<style scoped></style>
