<template>
  <v-app>
    <v-main>
      <SideNavigation />

      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import SideNavigation from "./components/SideNavigation.vue";
</script>
