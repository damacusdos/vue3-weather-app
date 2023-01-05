<template>
  <article
    class="py-6 px-3 bg-weather-secondary flex rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2>{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div>
      <p class="text-3xl self-end">
        {{ Math.round(city.weather.main.temp) }}&deg
      </p>
      <div class="flex gap-2">
        <span class="text-xs"
          >H: {{ Math.round(city.weather.main.temp_max) }}</span
        >
        <span class="text-xs"
          >L: {{ Math.round(city.weather.main.temp_min) }}</span
        >
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
