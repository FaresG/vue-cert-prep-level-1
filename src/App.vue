<script setup>
import { items } from "./movies.json";
import { computed, reactive, ref } from "vue";
import { StarIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/solid";

const movies = ref(items);
const ratings = [1, 2, 3, 4, 5];

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
  movies.value.forEach((movie) => {
    total += movie.rating;
  });
  return (total / totalMovies.value).toFixed(1);
});

// Edit form
const selectedMovie = ref({})
const isEditFormVisible = ref(false)
</script>

<template>
  <div class="app">
    <div class="flex justify-between w-full">
      <div class="flex gap-3 font-bold">
        <span
          >Total Movies: <span>{{ totalMovies }}</span></span
        >
        <span>/</span>
        <span
          >Average Rating: <span>{{ averageRating }}</span></span
        >
      </div>
      <div class="flex gap-3">
        <button class="button" @click="isCreateFormVisible = true">
          Reset ratings
        </button>
        <button class="button" @click="isCreateFormVisible = true">
          Add movie
        </button>
      </div>
    </div>
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
                :class="[
                  movie.rating
                    ? 'movie-item-star-content-rating-rated'
                    : 'movie-item-star-content-rating-not-rated',
                ]"
              >
                {{ movie.rating ? movie.rating : "-" }}
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
              Rating: ({{ movie.rating ?? "-" }}/5)
            </span>

            <button
              v-for="rating in ratings"
              @click="movie.rating = rating"
              :disabled="rating === movie.rating"
              :class="{ 'cursor-not-allowed': rating === movie.rating }"
            >
              <StarIcon
                class="movie-item-star-icon"
                :class="{
                  '!text-gray-500': !movie.rating || rating > movie.rating,
                }"
              />
            </button>
          </div>
          <div class="movie-item-crud-wrapper">
            <button
              class="border border-black rounded-full p-1"
              @click="isEditFormVisible = true"
            >
              <PencilIcon class="w-[18px] text-black" />
            </button>
            <button class="border border-red-600 rounded-full p-1">
              <TrashIcon class="w-[18px] text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="create-form" v-show="isCreateFormVisible">
    <form @submit.prevent="submitCreateMovieForm()">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="newMovie.name"
          type="text"
          :class="{ 'invalid-input': invalidInputs.name }"
          @keydown="invalidInputs.name = false"
        />
        <p class="invalid-input-text" v-show="invalidInputs.name">
          Name is required
        </p>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="newMovie.description"
          rows="3"
        ></textarea>
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
        <button
          class="button"
          type="button"
          @click="isCreateFormVisible = false"
        >
          Cancel
        </button>
        <button type="submit" class="button">Create</button>
      </div>
    </form>
  </div>
  <div class="edit-form" v-show="isEditFormVisible">
    <form @submit.prevent="submitEditMovieForm()">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="newMovie.name"
          type="text"
          :class="{ 'invalid-input': invalidInputs.name }"
          @keydown="invalidInputs.name = false"
        />
        <p class="invalid-input-text" v-show="invalidInputs.name">
          Name is required
        </p>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="newMovie.description"
          rows="3"
        ></textarea>
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
        <button
          class="button"
          type="button"
          @click="isCreateFormVisible = false"
        >
          Cancel
        </button>
        <button type="submit" class="button">Create</button>
      </div>
    </form>
  </div>
</template>
