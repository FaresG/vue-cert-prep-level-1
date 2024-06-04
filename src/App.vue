<script setup>
import { items } from "./movies.json";
import {ref} from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";

const movies = ref(items)
const ratings = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="app">
    <div class="movie-list">
      <div class="movie-item" v-for="movie in movies" :key="movie.id">
        <div class="movie-item-image-wrapper">
          <div class="movie-item-star-wrapper">
            <StarIcon
                class="movie-item-star-rating-icon"
                :class="[movie.rating ? 'text-yellow-500' : 'text-gray-500']"
            />
            <div class="movie-item-star-content-wrapper">
              <span
                  v-if="movie.rating"
                  :class="[movie.rating ? 'movie-item-star-content-rating-rated' : 'movie-item-star-content-rating-not-rated']"
              >
                {{ movie.rating ? movie.rating : '-' }}
              </span>
            </div>
          </div>
          <img :src="movie.image" class="movie-item-image" alt="" />
        </div>

        <div class="movie-item-content-wrapper">
          <div class="movie-item-title-wrapper">
            <h3 class="movie-item-title">{{ movie.name }}</h3>
            <div class="movie-item-genres-wrapper">
              <span
                  v-for="genre in movie.genres"
                  :key="`${movie.id}-${genre}`"
                  class="movie-item-genre-tag"
              >{{ genre }}</span
              >
            </div>
          </div>
          <div class="movie-item-description-wrapper">
            <p class="movie-item-description">{{ movie.description }}</p>
          </div>
          <div class="movie-item-rating-wrapper">
            <span class="movie-item-rating-text">
              Rating: ({{ movie.rating ?? '-' }}/5)
            </span>

            <button
                v-for="rating in ratings"
                @click="movie.rating = rating"
                :disabled="rating === movie.rating"
                :class="{'cursor-not-allowed': rating === movie.rating}"
            >
              <StarIcon
                class="movie-item-star-icon"
                :class="{ '!text-gray-500': rating > movie.rating }"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
