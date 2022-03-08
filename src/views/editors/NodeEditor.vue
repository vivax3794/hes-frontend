<template>
  <v-navigation-drawer permanent>
    <v-list>
      <NodeList v-for="(item, i) in ext.nodeFolders" :key="i" :node="item" />
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

import NodeList from "../../components/NodeEditor/NodeList.vue";

const ext = state.value.currentExtension;
const route = useRoute();
const selectedNode: ComputedRef<Node | null> = computed(
  () => ext.nodesMapping[route.params.nodeID as string] ?? null
);
</script>
