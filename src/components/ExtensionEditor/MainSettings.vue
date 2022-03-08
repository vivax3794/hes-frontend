<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="nameValue"
        :error-messages="nameError"
        label="Name"
        :counter="128"
        prepend-icon="mdi-form-textbox"
        @update:model-value="updateName"
      />
    </v-col>
    <v-col>
      <v-select
        :items="validLangs"
        v-model="ext.languague"
        prepend-icon="mdi-earth"
        label="Languague"
      />
    </v-col>
  </v-row>
  <v-textarea v-model="ext.description" label="Description" />
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

const nameValue = ref(ext.name);
const nameError: Ref<string | undefined> = ref(undefined);

async function updateName(): Promise<void> {
  if (nameValue.value.length > 128) {
    nameError.value = "Name cant be longer than 128 chars.";
  } else {
    nameError.value = undefined;
    ext.name = nameValue.value;
    console.log(ext);
  }
}
</script>
