<template>
  <v-app>
    <TopBar />
    <SideNavigation />

    <v-main>
      <v-container style="height: 100vh">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import SideNavigation from "./components/SideNavigation.vue";
import TopBar from "./components/TopBar.vue";
</script>
