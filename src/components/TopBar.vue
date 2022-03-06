<template>
  <v-app-bar app>
    <v-app-bar-title tag="div">
      Hacknet IDE:
      <span class="text-primary">{{ state.currentExtension.name }}</span>
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-theme-light-dark" @click="emit('theme-toggle')" />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import state from "../state";

const emit = defineEmits<{
  (e: "theme-toggle"): void;
}>();
</script>
