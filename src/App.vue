<template>
   <div id="app">
      <LoadingOverlay />
      
      <NavBar v-if="!$route.name.includes('Admin')"/>
      <div class="min-h-screen bg-gray-50">
         <router-view></router-view>
      </div>
      <Footer />  

      <ConfirmationModal />
      <UserVerificationModal />
   </div>
</template>

<script setup>
import LoadingOverlay from './components/LoadingOverlay.vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

import ConfirmationModal from './components/ConfirmationModal.vue';
import UserVerificationModal from './components/UserVerificationModal.vue';
</script>

<style scoped></style>
