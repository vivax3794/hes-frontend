<template>
  <v-switch
    color="primary"
    label="Intro Text Enabled"
    v-model="ext.introTextEnabled"
    class="toogle-button"
  />
  <v-textarea v-model="ext.introText" :disabled="!ext.introTextEnabled" rows="20" />
</template>

<script lang="ts" setup>
import state from "../../state";

const ext = state.value.currentExtension;
</script>
