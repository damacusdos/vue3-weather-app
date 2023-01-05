import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "city-view",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to);
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } | Local Weather`;
  next();
});

export default router;
