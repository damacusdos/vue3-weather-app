<template>
  <div class="py-6 px-3 bg-weather-secondary flex rounded-md shadow-md">
    <div class="flex flex-col gap-2 flex-1">
      <AnimatedLayout class="max-w-[50%]" />
      <AnimatedLayout class="max-w-[40%]" />
    </div>
    <div class="flex flex-col gap-2 items-end flex-1">
      <AnimatedLayout class="max-w-[60px] w-full" />
      <AnimatedLayout class="max-w=[65px] w-full" />
    </div>
  </div>
</template>

<script setup>
import AnimatedLayout from "./AnimatedLayout.vue";
</script>
