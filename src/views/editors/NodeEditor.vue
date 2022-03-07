<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item
        active-color="secondary"
        v-for="(node, i) in nodes"
        :key="i"
        :title="node.name"
        :to="`/node/${node.id}`"
      />
    </v-list>
  </v-navigation-drawer>

  <div v-if="selectedNode !== null">
    <h1>{{ selectedNode.name }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
import { useRoute } from "vue-router";

import state from "../../state";
import Node from "../../state/node";

const nodes = state.value.currentExtension.nodes;
const route = useRoute();
const selectedNode: ComputedRef<Node | null> = computed(
  () => nodes[route.params.nodeID as string] ?? null
);
</script>
