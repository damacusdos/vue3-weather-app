<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResult"
        placeholder="Search for a city or a state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="queryResults"
        class="absolute w-full text-white bg-weather-secondary shadow-md py-2 px-1 top-[66px] rounded"
      >
        <p v-if="serverError" class="py-2 px-2">
          Sorry, something went wrong. Please try again
        </p>
        <p v-if="!serverError && queryResults.length === 0" class="py-2 px-2">
          Can not find your query, please try another term
        </p>
        <template v-else>
          <li
            v-for="queryResult in queryResults"
            :key="queryResult.id"
            class="py-2 px-2 cursor-pointer"
            @click="previewCity(queryResult)"
          >
            {{ queryResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div>
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import { config } from "../config";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";

const router = useRouter();

const previewCity = (queryResult) => {
  console.log(queryResult);
  const [city, state] = queryResult.place_name.split(",");
  router.push({
    name: "city-view",
    params: {
      state: state.replaceAll(" ", ""),
      city: city.replaceAll(" ", ""),
    },
    query: {
      lat: queryResult.geometry.coordinates[1],
      lg: queryResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const queryResults = ref(null);
const serverError = ref(null);

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    try {
      if (searchQuery.value) {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${config.MAPBOX_API_KEY}&types=place`
        );
        queryResults.value = result.data.features;
        return;
      }
    } catch (e) {
      serverError.value = true;
    }

    queryResults.value = null;
  }, 300);
};

getSearchResult();
</script>
