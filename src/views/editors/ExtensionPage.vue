<template>
  <v-card>
    <v-card-header>
      <h1>{{ ext.name }}</h1>
    </v-card-header>

    <v-container>
      <v-form @submit="form_submit" ref="form" v-model="valid">
        <v-row justify="space-around">
          <v-col>
            <v-text-field
              v-model="form_values.name"
              label="Name"
              :counter="128"
              :rules="rules.name"
              prepend-icon="mdi-form-textbox"
              @update:model-value="on_change"
            />
          </v-col>
          <v-col>
            <v-select
              :items="Object.values(valid_langs)"
              v-model="form_values.languague"
              prepend-icon="mdi-earth"
              label="Languague"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, Ref } from "vue";
import state from "../../state";
const ext = state.value.current_extension;

// eslint-disable-next-line
const form: Ref<any | null> = ref(null);

const valid_langs: { [key: string]: string } = {
  "en-us": "english",
  "de-de": "german",
  "fr-be": "french",
  "ru-ru": "russian",
  "es-ar": "spanish",
  "ko-kr": "korean",
  "ja-jp": "japanese",
  "zh-cn": "chinese, simplified",
};

const valid = ref(false);
const rules = {
  name: [(name: string) => name.length <= 128 || "name must be shorter than 128 chars"],
};

const form_values = ref({
  name: ext.name,
  languague: valid_langs[ext.languague],
});

// Validate while typing!
async function on_change(): Promise<void> {
  await form.value.validate();
}

function form_submit(): void {
  console.log("updating extention with", form_values);
  ext.name = form_values.value.name;
  ext.languague = valid_langs[form_values.value.languague];
}

onBeforeUnmount(async () => {
  await form.value.validate();
  if (valid.value) {
    form_submit();
  } else {
    console.log("INVALID FORM STATE, CAN NOT SAVE");
  }
});
</script>
