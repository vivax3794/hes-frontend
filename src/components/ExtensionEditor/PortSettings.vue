<template>
  <v-checkbox
    v-model="node.impossibleToCrack"
    label="cant crack"
    color="red"
    density="compact"
    style="height: 40px"
  />

  <div class="text-caption">Amount of ports needed to crack</div>
  <v-slider
    v-model="node.portsToCrack"
    min="0"
    max="12"
    step="1"
    show-ticks="always"
    tick-size="4"
    thumb-label
    :disabled="node.impossibleToCrack"
  />

  <v-divider />

  <v-checkbox
    v-for="(port, i) in validPorts"
    :key="i"
    v-model="node.ports"
    :label="`${port.name} (${port.number})`"
    :value="port.number"
    density="compact"
    style="height: 40px"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

import state from "../../state";

const props = defineProps<{ nodeID: string }>();
const node = computed(() => state.value.currentExtension.nodesMapping[props.nodeID]);

const validPorts = [
  { name: "ssh", number: "22" },
  { name: "Webserver", number: "80" },
  { name: "SMTP", number: "25" },
  { name: "FTP", number: "21" },
  { name: "SQL", number: "1433" },
  { name: "Medical", number: "104" },
  { name: "BitTorrent", number: "6881" },
  { name: "SSL", number: "443" },
  { name: "Pacific", number: "192" },
  { name: "Version Control", number: "9418" },
  { name: "Blizzard", number: "3724" },
  { name: "eOS", number: "3659" },
];
</script>
