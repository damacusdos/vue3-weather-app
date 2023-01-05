<template>
  <div v-for="city in savedCities" :key="city.id" class="mb-3">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lg}&appid=4d332d9d3f9f7e47c58aaf8448b3d1fe&units=metric`
      )
    );
  });

  const weathers = await Promise.all(requests);
  weathers.forEach((weather, index) => {
    savedCities.value[index].weather = weather.data;
  });
};

await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "city-view",
    params: {
      city: city.city,
      state: city.state,
    },
    query: {
      lat: city.coords.lat,
      lg: city.coords.lg,
      id: city.id,
    },
  });
};
</script>
