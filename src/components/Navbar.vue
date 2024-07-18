<script setup>

</script>

<template>
  <nav>
    <RouterLink to="/">Movies List</RouterLink>
    <RouterLink to="/about">About Us</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  @apply flex items-center w-full px-3
}
a {
  @apply bg-gray-500 hover:opacity-70 text-white px-5 py-3
}
a:not(:last-of-type) {
  @apply border-r border-r-gray-900
}
a:first-of-type {
  @apply rounded-l-md
}
a:last-of-type {
  @apply rounded-r-md
}
</style>