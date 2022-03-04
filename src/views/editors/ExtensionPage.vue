<template>
  <v-card>
    <v-card-header>
      <h1>{{ ext.name }}</h1>
    </v-card-header>

    <v-container>
      <v-text-field
        v-model="formValues.name"
        :error-messages="formErrors.name"
        label="Name"
        :counter="128"
        prepend-icon="mdi-form-textbox"
        @update:model-value="updateName"
      />

      <v-select
        :items="validLangs"
        v-model="ext.languague"
        prepend-icon="mdi-earth"
        label="Languague"
        style="width: 25%"
      />
      <v-divider />
      <!-- Toogle Setting -->
      <v-switch
        color="primary"
        label="Allow Saving"
        v-model="ext.allowSave"
        class="toogle-button"
      />
      <v-switch
        color="primary"
        label="Boot sequence start"
        v-model="ext.hasIntroStartup"
        class="toogle-button"
      />
    </v-container>
  </v-card>
</template>

<style lang="sass">
.toogle-button
  height: 40px
</style>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import state from "../../state";
const ext = state.value.currentExtension;
const validLangs = [
  { title: "english", value: "en-us" },
  { title: "german", value: "de-de" },
  { title: "french", value: "fr-be" },
  { title: "russian", value: "ru-ru" },
  { title: "spanish", value: "es-ar" },
  { title: "korean", value: "ko-kr" },
  { title: "japanese", value: "ja-jp" },
  { title: "chinese, simplified", value: "zh-cn" },
];

const formValues = ref({
  name: ext.name,
});

const formErrors: Ref<{ name: string | undefined }> = ref({
  name: undefined,
});

async function updateName(): Promise<void> {
  const newName = formValues.value.name;

  if (newName.length > 128) {
    formErrors.value.name = "Name cant be longer than 128 chars.";
  } else {
    formErrors.value.name = undefined;
    ext.name = newName;
  }
}
</script>
