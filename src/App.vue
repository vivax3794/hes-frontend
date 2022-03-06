<template>
  <v-app :theme="theme">
    <TopBar @theme-toggle="toggleTheme" />
    <SideNavigation />

    <v-main>
      <v-container style="height: 100vh">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useStorage, usePreferredDark } from "@vueuse/core";

import SideNavigation from "./components/SideNavigation.vue";
import TopBar from "./components/TopBar.vue";

const theme = useStorage("color-theme", usePreferredDark().value ? "dark" : "light");

function toggleTheme(): void {
  theme.value = theme.value === "dark" ? "light" : "dark";
}
</script>
