<template>
  <v-row justify="center" style="padding-top: 20px">
    <v-col>
      <v-card>
        <v-card-header>
          <h1>Export</h1>
        </v-card-header>
        <v-card-actions>
          <v-btn color="primary">Export</v-btn>
          <v-btn color="secondary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-header> <h1>Import</h1> </v-card-header>

        <v-file-input
          label="Extension"
          accept=".zip"
          prepend-icon="mdi-folder-zip"
          v-model="importFile"
        />

        <v-card-actions>
          <v-btn color="red" @click="importClicked">Import</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import * as zip from "@zip.js/zip.js";
import { state, Extension } from "../state";

import { Ref, ref } from "vue";

const importFile: Ref<File[]> = ref([]);

async function importClicked(): Promise<void> {
  console.log("import files:", importFile.value);

  if (importFile.value.length !== 1) return;

  const file = importFile.value[0];
  const zipReader = new zip.ZipReader(new zip.BlobReader(file));

  const newExtension = await Extension.createExtension(zipReader);
  state.value.currentExtension = newExtension;
}
</script>
