<template>
  <v-text-field v-model="node.name" label="Name" prepend-icon="mdi-form-textbox" />
  <v-text-field
    v-model="node.ip"
    placeholder="leave empty for random ip"
    :label="node.ip === '' ? 'IP - random' : 'IP'"
    prepend-icon="mdi-map-marker"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

import state from "../../state";

const props = defineProps<{ nodeID: string }>();
const node = computed(() => state.value.currentExtension.nodesMapping[props.nodeID]);
</script>
