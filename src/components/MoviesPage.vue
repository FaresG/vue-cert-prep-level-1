<script setup>
import {computed, reactive, ref, watch} from "vue";
import { items } from "@/movies.json";
import MovieItem from "@/components/MovieItem.vue";
import MovieForm from "@/components/MovieForm.vue";

const movies = ref(items);

// Create movie form
const isVisible = ref(false);
const isCreate = ref(false);
const movieForm = reactive({
  id: 0,
  name: '',
  description: '',
  image: '',
  rating: 0,
  genres: [],
  inTheaters: false
})
const showMovieForm = (formInputs, type) => {
  updateMovieForm(formInputs)
  isCreate.value = type === 'create'
  isVisible.value = true
}
const updateMovieForm = (formInputs) => {
  if (!formInputs) return null

  Object.assign(movieForm, formInputs)
}
const resetMovieForm = () => {
  movieForm.id = 0
  movieForm.name = ''
  movieForm.description = ''
  movieForm.image = ''
  movieForm.image = ''
  movieForm.rating = 0
  movieForm.genres = []
  movieForm.inTheaters = false
}
watch(isVisible, (newValue) => {
  // reset movie form when it gets closed (via cancel or submit buttons).
  if (!newValue) {
    resetMovieForm()
  }
})

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
const submitMovieForm = (formInputs) => {
  if (isCreate.value) {
    formInputs.id = movies.value.length + 1
    formInputs.rating = 0
    movies.value.push(formInputs)
  }
  else {
    let index = movies.value.findIndex(movie => movie.id === formInputs.id)
    movies.value[index] = formInputs
  }

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
  <div class="flex flex-col gap-5">
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
        <button class="button" @click="showMovieForm(null, 'create')">
          Add movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @update:rating="updateRating"
          @edit="(selectedMovie) => showMovieForm(selectedMovie, 'edit')"
          @remove="removeMovie"
      />
    </div>
  </div>
  <MovieForm
      :modelValue="movieForm"
      :isCreate="isCreate"
      :isVisible="isVisible"
      @update:modelValue="submitMovieForm"
      @cancel="isVisible = false"
  />
</template>
