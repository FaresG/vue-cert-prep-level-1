<script setup>
import { onMounted, reactive } from "vue";

const model = defineModel()
const props = defineProps({
  isCreate: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['create:movie', 'update:movie', 'cancel'])

const invalidInputs = reactive({
  name: false,
  description: false,
  genres: false,
  inTheatres: false,
});
const submit = () => {
  emit(props.isCreate ? 'create:movie' : 'update:movie', model.value)
};
onMounted(() => {
  console.log(model.value)
})
</script>

<template>
  <div v-show="isVisible" class="pop-up-form">
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
            id="name"
            v-model="model.name"
            :class="{ 'invalid-input': invalidInputs.name }"
            type="text"
            @keydown="invalidInputs.name = false"
        />
        <p
            v-show="invalidInputs.name"
            class="invalid-input-text"
        >
          Name is required
        </p>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="model.description" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image URl</label>
        <input id="image" v-model="model.image" type="text" />
      </div>
      <div class="form-group">
        <label for="genres">Genres</label>
        <select id="genres" v-model="model.genres" multiple>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Adventure">Adventure</option>
          <option value="Action">Action</option>
        </select>
      </div>
      <div class="flex gap-2">
        <input type="checkbox" />
        <span>In theaters</span>
      </div>
      <div class="flex justify-between mt-8">
        <button class="button" type="button" @click="$emit('cancel')">
          Cancel
        </button>
        <button class="button" type="submit">{{ isCreate ? 'Create': 'Update' }}</button>
      </div>
    </form>
  </div>
</template>