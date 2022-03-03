<template>
  <h1 style="text-align: center">
    You are currently editing
    <span style="color: red">{{ state.current_extension.name }}</span>
  </h1>
</template>

<script lang="ts" setup>
import state from "../state";
</script>
