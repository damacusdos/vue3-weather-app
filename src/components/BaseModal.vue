<!-- 
  /**
    @see https://vuejs.org/guide/built-ins/transition.html
  */
 -->

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full h-screen bg-black bg-opacity-30 flex justify-center top-0 left-0 px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="bg-white mt-32 p-4 self-start max-w-screen-md rounded flex flex-col"
          >
            <slot />
            <button
              class="bg-weather-primary text-white mt-8 px-4 py-2 rounded self-end"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.moda-inner-leave-to {
  transform: scale(0.8);
}
</style>
