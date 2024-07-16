<script setup>
import {computed, onMounted, reactive} from "vue";
import AppModal from "@/components/AppModal.vue";

// for somereason i need to seperate the modelValue from the form's input fields
const props = defineProps({
  isCreate: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['update:modelValue', 'cancel'])

// Fix bug of movie getting updated when you hit cancel
const formInputs = computed(() => {
  return {
    id: props.modelValue?.id,
    name: props.modelValue?.name,
    description: props.modelValue?.description,
    image: props.modelValue?.image,
    rating: props.modelValue?.rating,
    genres: props.modelValue?.genres,
    inTheaters: props.modelValue?.inTheaters
  }
})

const invalidInputs = reactive({
  name: false,
  description: false,
  genres: false,
  inTheatres: false,
});

const submit = () => {
  emit('update:modelValue', formInputs.value)
};

const cancel = () => {
  emit('cancel')
}
onMounted(() => {
  console.log(props.modelValue)
})
</script>

<template>
  <AppModal
    :title="`${isCreate ? 'Create' : 'Edit'} Movie`"
    :isVisible="isVisible"
    @close="cancel"
  >
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
            id="name"
            v-model="formInputs.name"
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
        <textarea id="description" v-model="formInputs.description" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image URl</label>
        <input id="image" v-model="formInputs.image" type="text"/>
      </div>
      <div class="form-group">
        <label for="genres">Genres</label>
        <select id="genres" v-model="formInputs.genres" multiple>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Adventure">Adventure</option>
          <option value="Action">Action</option>
        </select>
      </div>
      <div class="flex gap-2">
        <input
            :checked="formInputs.inTheaters"
            type="checkbox"
        />
        <span>In theaters</span>
      </div>
      <div class="flex justify-between mt-8">
        <button class="button" type="button" @click="cancel">
          Cancel
        </button>
        <button class="button" type="submit">{{ isCreate ? 'Create' : 'Update' }}</button>
      </div>
    </form>
  </AppModal>
</template>