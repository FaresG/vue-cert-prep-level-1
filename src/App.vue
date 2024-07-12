<script setup>
import { items } from "./movies.json";
import { computed, reactive, ref } from "vue";
import MovieItem from "@/components/MovieItem.vue";
import MovieForm from "@/components/MovieForm.vue";

const movies = ref(items);

// Create movie form
const isVisible = ref(false);
const isCreate = ref(false);
const movie = ref({})
const createMovie = (newMovie) => {
  if (!newMovie) return

  newMovie.id = movies.value.length + 1
  newMovie.rating = 0
  movies.value.push(newMovie)
  movie.value = {}

  isVisible.value = false
}
const showMovieForm = (create = false) => {
  isVisible.value = true
  isCreate.value = create
}

// metrics
const totalMovies = computed(() => {
  return movies.value.length;
});

const averageRating = computed(() => {
  let total = 0;
  movies.value.forEach(movie => {
    total += movie.rating;
  });
  if (totalMovies.value === 0) return 0

  return (total / totalMovies.value).toFixed(1);
});

const updateRating = (data) => {
  let movie = movies.value.find((movie) => {
    return movie.id === data.id
  })
  if (movie.id) {
    movie.rating = data.rating
  }
}

// Edit form
const openEditForm = (selectedMovie) => {
  movie.value = selectedMovie
  isCreate.value = false
  isVisible.value = true
}
const updateMovie = (updatedMovie) => {
  let index = movies.value.findIndex(movie => movie.id === updatedMovie.id)
  movies.value[index] = updatedMovie

  isVisible.value = false
}

// delete movie
const removeMovie = (id) => {
  if (!id) return
  movies.value = movies.value.filter(movie => movie.id !== id)
}

// reset ratings
const resetRatings = () => {
  if (movies.value.length) {
    movies.value.forEach(movie => {
      movie.rating = 0
    })
  }
}
</script>

<template>
  <div class="app">
    <div class="flex justify-between w-full">
      <div class="flex gap-3 font-bold text-white">
        <span>Total Movies: <span>{{ totalMovies }}</span></span>
        <span>/</span>
        <span>Average Rating: <span>{{ averageRating }}</span></span>
      </div>
      <div class="flex gap-3">
        <button class="button" @click="resetRatings()">
          Reset ratings
        </button>
        <button class="button" @click="showMovieForm(true)">
          Add movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem
          v-for="(movie, key) in movies"
          :key="key" :movie="movie"
          @update:rating="updateRating"
          @edit="openEditForm"
          @remove="removeMovie"
      />
    </div>
  </div>
  <MovieForm
      v-model="movie"
      :is-create="isCreate"
      :is-visible="isVisible"
      @create:movie="createMovie"
      @update:movie="updateMovie"
      @cancel="isVisible = false"
  />
</template>
