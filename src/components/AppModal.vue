<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid"
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close'])
</script>

<template>
  <div v-show="isVisible" class="pop-up-form">
    <div class="modal">
      <p>
        <button
            class="w-[20px] float-right"
            @click="$emit('close')"
        >
          <XMarkIcon />
        </button>
      </p>
      <h1>{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>