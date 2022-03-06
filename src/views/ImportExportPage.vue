<template>
  <v-row justify="center" style="padding-top: 20px">
    <v-col>
      <v-card>
        <v-card-header>
          <h1>Export</h1>
        </v-card-header>

        <v-progress-linear indeterminate v-if="exportLoading" color="primary" />

        <v-card-actions>
          <v-btn color="primary" :disabled="exportLoading" @click="exportClicked">
            Export
          </v-btn>
          <v-btn color="secondary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-header> <h1>Import</h1> </v-card-header>

        <v-container style="padding-bottom: 0px">
          <v-file-input
            label="Extension"
            accept=".zip"
            prepend-icon="mdi-folder-zip"
            v-model="importFiles"
          />
        </v-container>

        <v-card-actions>
          <v-btn color="red" @click="importClicked" :disabled="importFiles.length === 0">
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import * as zip from "@zip.js/zip.js";
import { state, Extension } from "../state";

import { Ref, ref } from "vue";

const importFiles: Ref<File[]> = ref([]);

async function importClicked(): Promise<void> {
  console.log("import files:", importFiles.value);

  const file = importFiles.value[0];
  const zipReader = new zip.ZipReader(new zip.BlobReader(file));

  const newExtension = await Extension.createExtension(zipReader);
  state.value.currentExtension = newExtension;
}

const exportLoading = ref(false);

async function exportClicked(): Promise<void> {
  exportLoading.value = true;
  const [dataUri, fileName] = await state.value.currentExtension.exportExtension();

  // create download link and click it
  const element = document.createElement("a");
  element.setAttribute("href", dataUri);
  element.setAttribute("download", fileName);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);

  exportLoading.value = false;
}
</script>
