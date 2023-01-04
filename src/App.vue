<template>
  <div>
    <SiteNavigation />
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import SiteNavigation from "./components/SiteNavigation.vue";
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped></style>
