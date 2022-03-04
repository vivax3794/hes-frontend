<template>
  <v-app-bar app>
    <v-app-bar-title>
      Hacknet IDE:
      <span id="current_extension">{{ state.currentExtension.name }}</span>
    </v-app-bar-title>
  </v-app-bar>
</template>

<style lang="sass">
@import "../_vars"

#current_extension
  color: $primary
</style>

<script lang="ts" setup>
import state from "../state";
</script>
