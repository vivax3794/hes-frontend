<template>
  <v-card>
    <v-card-header>
      <h1>{{ ext.name }}</h1>
    </v-card-header>

    <v-form>
      <v-text-field
        v-model="ext.name"
        label="Name"
        :counter="128"
        :error-messages="state.current_errors.exstention_name ?? undefined"
        @update:model-value="validate_name"
      />
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
import state from "../../state";
const ext = state.value.current_extension;

function validate_name(name: string): void {
  state.value.current_errors.exstention_name =
    name.length <= 128 ? null : "name cant be above 128 chars.";
}
</script>
