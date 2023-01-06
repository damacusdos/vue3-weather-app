<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- banner -->
    <div
      v-if="route.query.preview"
      class="text-white bg-weather-secondary text-center p-4 w-full"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <!-- weather overview -->
    <div class="flex flex-col items-center text-white py-12">
      <!-- city -->
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <!-- time info -->
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-US", {
            weekday: "short",
            month: "long",
            day: "2-digit",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-US", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg
        <!-- <span class="text-2xl">°C</span> -->
      </p>
      <p>Feels like: {{ Math.round(weatherData.current.feels_like) }}&deg</p>
      <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
      <img
        class="w-[120px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <hr class="w-full border-white border-opacity-10 border" />
    <!-- hourly weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="text-white mx-8">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleString("en-US", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="w-full border-white border-opacity-10 border" />
    <!-- weekly weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Days Forecast</h2>
        <div
          v-for="dailyData in weatherData.daily"
          :key="dailyData.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(dailyData.dt * 1000).toLocaleString("en-US", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(dailyData.temp.max) }}</p>
            <p>L: {{ Math.round(dailyData.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!route.query.preview"
      class="text-white hover:text-red-500 cursor-pointer duration-150 py-12 flex gap-3 items-center"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { config } from "../config";

const route = useRoute();
console.log(route);

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lg}&appid=${config.WEATHER_API_KEY}&units=metric`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();
console.log(weatherData);

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  console.log(cities);
  console.log(route.query.id);
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  console.log(updatedCities);

  localStorage.setItem("savedCities", JSON.stringify(updatedCities));

  router.push({
    name: "home",
  });
};
</script>
