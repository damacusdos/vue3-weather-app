<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col items-center py-12 px-8">
      <AnimatedLayout class="max-w-[275px] w-full mb-2" />
      <AnimatedLayout class="max-w-[300px] w-full mb-12" />
      <AnimatedLayout class="max-w-[250px] h-[100px] w-full mb-12" />
      <AnimatedLayout class="max-w-[275px] w-full mb-8" />
      <AnimatedLayout class="max-w-[300px] h-[75px] w-full" />
    </div>
    <div class="flex flex-col items-center py-12 px-8">
      <AnimatedLayout class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
    <div class="flex flex-col items-center py-12 px-8">
      <AnimatedLayout class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
  </div>
</template>

<script setup>
import AnimatedLayout from "./AnimatedLayout.vue";
</script>
