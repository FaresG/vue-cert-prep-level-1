<script setup>
import { items } from "./movies.json";
import { computed, reactive, ref } from "vue";
import MovieItem from "@/components/MovieItem.vue";

const movies = ref(items);

// Create movie form
const isCreateFormVisible = ref(false);
const newMovie = ref({
  id: 0,
  name: "",
  description: "",
  genres: [],
  inTheatres: false,
  rating: 0,
});
const invalidInputs = reactive({
  name: false,
  description: false,
  genres: false,
  inTheatres: false,
});
const submitCreateMovieForm = () => {
  console.log("submit form");
  if (newMovie.value.name === "") {
    invalidInputs.name = true;
    return;
  }
  newMovie.value.id = movies.value.length + 1;
  movies.value.push(newMovie.value);
  isCreateFormVisible.value = false;
};

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
const selectedMovie = ref({})
const isEditFormVisible = ref(false)
const openEditModal = movieId => {
  selectedMovie.value = movies.value.find(movie => {
    return movie.id === movieId
  })
  isEditFormVisible.value = true
}
const submitEditMovieForm = () => {
  if (!selectedMovie.value.id) {
    // TODO: Display error
    return
  }
  let movie = movies.value.find(movie => {
    return movie.id === selectedMovie.value.id
  });
  if (!movie.id) {
    // TODO Display error
    return
  }
  Object.assign(movie, movies.value)
  isEditFormVisible.value = false
}

// delete movie
const deleteMovie = movieId => {
  movies.value = movies.value.filter(movie => movie.id !== movieId)
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
        <button class="button" @click="isCreateFormVisible = true">
          Add movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem v-for="(movie, key) in movies" :key="key" :movie="movie" @update:rating="updateRating" />
    </div>
  </div>
  <div v-show="isCreateFormVisible" class="pop-up-form">
    <form @submit.prevent="submitCreateMovieForm()">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="newMovie.name" :class="{ 'invalid-input': invalidInputs.name }" type="text"
          @keydown="invalidInputs.name = false" />
        <p v-show="invalidInputs.name" class="invalid-input-text">
          Name is required
        </p>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="newMovie.description" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input id="image" v-model="newMovie.image" type="text" />
      </div>
      <div class="form-group">
        <label for="genres">Genres</label>
        <select id="genres" v-model="newMovie.genres" multiple>
          <option value="drama">Drama</option>
          <option value="crime">Crime</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="adventure">Adventure</option>
        </select>
      </div>
      <div class="flex gap-2">
        <input type="checkbox" />
        <span>In theaters</span>
      </div>
      <div class="flex justify-between mt-8">
        <button class="button" type="button" @click="isCreateFormVisible = false">
          Cancel
        </button>
        <button class="button" type="submit">Create</button>
      </div>
    </form>
  </div>
  <div v-show="isEditFormVisible" class="pop-up-form">
    <form @submit.prevent="submitEditMovieForm()">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="selectedMovie.name" :class="{ 'invalid-input': invalidInputs.name }" type="text"
          @keydown="invalidInputs.name = false" />
        <p v-show="invalidInputs.name" class="invalid-input-text">
          Name is required
        </p>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="selectedMovie.description" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input id="image" v-model="selectedMovie.image" type="text" />
      </div>
      <div class="form-group">
        <label for="genres">Genres</label>
        <select id="genres" v-model="selectedMovie.genres" multiple>
          <option value="Drama">Drama</option>
          <option value="Crime">Crime</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Adventure">Adventure</option>
        </select>
      </div>
      <div class="flex gap-2">
        <input v-model="selectedMovie.inTheaters" type="checkbox" />
        <span>In theaters</span>
      </div>
      <div class="flex justify-between mt-8">
        <button class="button" type="button" @click="isEditFormVisible = false">
          Cancel
        </button>
        <button class="button" type="submit">Edit</button>
      </div>
    </form>
  </div>
</template>
