<template>
  <v-card>
    <v-card-header>
      <h1>All Errors</h1>
    </v-card-header>

    <v-list disabled>
      <v-list-item
        v-for="(error, i) in errors.list_errors()"
        :key="i"
        :title="error"
        prepend-icon="mdi-alert"
        color="red"
        :active="true"
      />
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import state from "../state";
const errors = state.value.current_errors;
</script>
