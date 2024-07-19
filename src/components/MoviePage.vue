<script setup>
import {StarIcon} from "@heroicons/vue/24/solid";
import {useRoute} from "vue-router";
import {items} from "@/movies.json"
import {ref} from "vue";

const route = useRoute()
const movie = ref(null)

if (route.params?.id) {
  items.map((m) => {
    if (parseInt(route.params.id) === m.id) {
      movie.value = m
    }
  })
}
</script>

<template>
<div v-if="!movie">
  <h1 class="text-white text-2xl">Movie Not found!</h1>
  <p class="mt-10">
    <RouterLink :to="{name: 'movies'}">go back</RouterLink>
  </p>
</div>
<div v-else class="movie-item">
  <div class="movie-item-image-wrapper">
    <div class="movie-item-star-wrapper">
      <StarIcon class="movie-item-star-rating-icon" :class="[movie.rating ? 'text-yellow-500' : 'text-gray-500']" />
      <div class="movie-item-star-content-wrapper">
        <span v-if="movie.rating" :class="[
          movie.rating
            ? 'movie-item-star-content-rating-rated'
            : 'movie-item-star-content-rating-not-rated',
        ]">
          {{ movie.rating ?? "-" }}
        </span>
      </div>
    </div>
    <img :src="movie.image" class="movie-item-image" :alt="movie.name" />
  </div>

  <div class="movie-item-content-wrapper">
    <div class="movie-item-title-wrapper">
      <h3 class="movie-item-title">{{ movie.name }}</h3>
      <div class="movie-item-genres-wrapper">
        <span v-for="genre in movie.genres" :key="`${movie.id}-${genre}`" class="movie-item-genre-tag">{{ genre
          }}</span>
      </div>
    </div>
    <div class="movie-item-description-wrapper">
      <p class="movie-item-description">{{ movie.description }}</p>
    </div>
  </div>
</div>
</template>
<style scoped>
a {
  @apply bg-gray-500 hover:opacity-70 text-white px-5 py-3 rounded
}
</style>