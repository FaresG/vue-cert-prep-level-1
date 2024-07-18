<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid"

defineProps({
  title: {
    type: String,
    default: null
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>

<template>
  <Transition
      name="fade"
  >
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
        <slot/>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal {
  transition: all 0.3s ease;
}

.fade-enter-from .modal,
.fade-leave-to .modal {
  transform: translateY(-50px);
  opacity: 0;
}

.fade-enter-to .modal,
.fade-leave-from .modal {
  transform: translateY(0);
  opacity: 1;
}
</style>