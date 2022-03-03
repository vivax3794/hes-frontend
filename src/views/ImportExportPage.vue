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
          v-model="import_files"
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

let import_files: Ref<File[]> = ref([]);

async function importClicked(): Promise<void> {
  console.log("import files:", import_files.value);

  if (import_files.value.length !== 1) return;

  const file = import_files.value[0];
  const zip_reader = new zip.ZipReader(new zip.BlobReader(file));

  const new_ext = await Extension.create_extension(zip_reader);
  state.value.current_extension = new_ext;
}
</script>
