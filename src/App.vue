<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>