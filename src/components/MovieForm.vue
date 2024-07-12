<!--<script setup>-->
<!--import {reactive, ref} from "vue";-->

<!--const props = defineProps(['movies'])-->
<!--const isCreateFormVisible = ref(false);-->
<!--const newMovie = ref({-->
<!--  id: 0,-->
<!--  name: "",-->
<!--  description: "",-->
<!--  genres: [],-->
<!--  inTheatres: false,-->
<!--  rating: 0,-->
<!--});-->
<!--const invalidInputs = reactive({-->
<!--  name: false,-->
<!--  description: false,-->
<!--  genres: false,-->
<!--  inTheatres: false,-->
<!--});-->
<!--const submitCreateMovieForm = () => {-->
<!--  console.log("submit form");-->
<!--  if (newMovie.value.name === "") {-->
<!--    invalidInputs.name = true;-->
<!--    return;-->
<!--  }-->
<!--  newMovie.value.id = props.movies.value.length + 1;-->
<!--  props.movies.value.push(newMovie.value);-->
<!--  isCreateFormVisible.value = false;-->
<!--};-->
<!--</script>-->
<!--<template>-->
<!--  <div v-show="isCreateFormVisible" class="pop-up-form">-->
<!--    <form @submit.prevent="submitCreateMovieForm()">-->
<!--      <div class="form-group">-->
<!--        <label for="name">Name</label>-->
<!--        <input id="name" v-model="newMovie.name" :class="{ 'invalid-input': invalidInputs.name }" type="text"-->
<!--               @keydown="invalidInputs.name = false" />-->
<!--        <p v-show="invalidInputs.name" class="invalid-input-text">-->
<!--          Name is required-->
<!--        </p>-->
<!--      </div>-->
<!--      <div class="form-group">-->
<!--        <label for="description">Description</label>-->
<!--        <textarea id="description" v-model="newMovie.description" rows="3"></textarea>-->
<!--      </div>-->
<!--      <div class="form-group">-->
<!--        <label for="image">Image</label>-->
<!--        <input id="image" v-model="newMovie.image" type="text" />-->
<!--      </div>-->
<!--      <div class="form-group">-->
<!--        <label for="genres">Genres</label>-->
<!--        <select id="genres" v-model="newMovie.genres" multiple>-->
<!--          <option value="drama">Drama</option>-->
<!--          <option value="crime">Crime</option>-->
<!--          <option value="action">Action</option>-->
<!--          <option value="comedy">Comedy</option>-->
<!--          <option value="adventure">Adventure</option>-->
<!--        </select>-->
<!--      </div>-->
<!--      <div class="flex gap-2">-->
<!--        <input type="checkbox" />-->
<!--        <span>In theaters</span>-->
<!--      </div>-->
<!--      <div class="flex justify-between mt-8">-->
<!--        <button class="button" type="button" @click="isCreateFormVisible = false">-->
<!--          Cancel-->
<!--        </button>-->
<!--        <button class="button" type="submit">Create</button>-->
<!--      </div>-->
<!--    </form>-->
<!--  </div>-->
<!--</template>-->