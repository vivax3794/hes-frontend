<template>
  <v-switch
    v-model="firewallOn"
    @change="updateFirewallOn"
    label="firewall enabled"
    color="primary"
    style="height: 40px"
  />
  <v-row>
    <v-col>
      <v-checkbox
        activated-color="primary"
        v-model="firewallRandom"
        @change="updateFirewallMode"
        :disabled="!firewallOn"
        label="Random Solution"
      />
    </v-col>
    <v-col>
      <div v-if="firewallRandom">
        <div class="text-caption">Solution lenght</div>
        <v-slider
          v-model="firewallLevel"
          @change="updateFirewallLevel"
          step="1"
          min="1"
          max="20"
          show-ticks="always"
          tick-size="4"
          thumb-label
          :disabled="!firewallOn"
        />
      </div>
      <div v-else>
        <v-text-field
          v-model="firewallSolution"
          @change="updateFirewallSolution"
          label="solution"
          prepend-icon="mdi-key"
          :disabled="!firewallOn"
        />
      </div>
    </v-col>
  </v-row>
  <div class="text-caption">Extra time per analyze</div>
  <v-slider
    v-model="firewallTime"
    @change="updateFirewallTime"
    min="0"
    max="2"
    step="0.01"
    thumb-label
    :disabled="!firewallOn"
  />

  <v-divider />
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

import state from "../../state";

const props = defineProps<{ nodeID: string }>();
const node = computed(() => state.value.currentExtension.nodesMapping[props.nodeID]);

const firewallOn = ref(false);
const firewallLevel = ref(0);
const firewallSolution = ref("");
const firewallTime = ref(0);
const firewallRandom = ref(false);

function loadInitValues(): void {
  firewallOn.value = node.value.firewall !== null;
  firewallLevel.value = node.value.firewall?.level ?? 0;
  firewallSolution.value = node.value.firewall?.solution ?? "";
  firewallTime.value = node.value.firewall?.additionalTime ?? 0;
  firewallRandom.value = node.value.firewall?.solution === null;
}

loadInitValues();
watch(props, loadInitValues);

function updateFirewallOn(): void {
  if (firewallOn.value) {
    node.value.firewall = {
      level: -1,
      solution: "",
      additionalTime: firewallTime.value,
    };
    updateFirewallMode();
  }
}

function updateFirewallMode() {
  if (node.value.firewall === null) throw Error("firewall is null.");

  if (firewallRandom.value) {
    node.value.firewall.solution = null;
    node.value.firewall.level = firewallLevel.value;
  } else {
    node.value.firewall.solution = firewallSolution.value;
    node.value.firewall.level = firewallSolution.value.length;
  }
}

function updateFirewallSolution() {
  if (node.value.firewall === null) throw Error("firewall is null.");

  node.value.firewall.solution = firewallSolution.value;
  node.value.firewall.level = firewallSolution.value.length;
}

function updateFirewallLevel() {
  if (node.value.firewall === null) throw Error("firewall is null.");

  node.value.firewall.level = firewallLevel.value;
}

function updateFirewallTime() {
  if (node.value.firewall === null) throw Error("firewall is null.");

  node.value.firewall.additionalTime = firewallTime.value;
}
</script>
