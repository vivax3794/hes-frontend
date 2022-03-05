<template>
  <v-card>
    <v-tabs v-model="tab" slider-color="secondary">
      <v-tab value="main">Main Settings</v-tab>
      <v-tab value="intro-text">Intro Text</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="main">
        <v-container>
          <MainSettings />
        </v-container>
      </v-window-item>
      <v-window-item value="intro-text">
        <v-container>
          <IntroText />
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import MainSettings from "../../components/ExtensionEditor/MainSettings.vue";
import IntroText from "../../components/ExtensionEditor/IntroText.vue";

const tab = ref("main");
</script>
