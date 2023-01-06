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
import { config } from "../config";

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lg}&appid=${config.WEATHER_API_KEY}&units=metric`
      )
    );
  });

  const weathers = await Promise.all(requests);

  // intent to show the skeleton effect
  await new Promise((res) => setTimeout(res, 500));

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
