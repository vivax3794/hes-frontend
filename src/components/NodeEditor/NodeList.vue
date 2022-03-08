<template>
  <v-list-group v-if="parentProps.node.children !== undefined">
    <template v-slot:activator="{ props }">
      <v-list-item :title="parentProps.node.name" v-bind="props" />
    </template>

    <NodeList v-for="(item, i) in parentProps.node.children" :key="i" :node="item" />
  </v-list-group>
  <v-list-item
    v-else
    active-color="secondary"
    :title="parentProps.node.name"
    :to="`/computer/${parentProps.node.id}`"
  />
</template>

<script lang="ts" setup>
// import Node from "../../state/node";
// import { type NodeFolderStructure, type NodeFolder } from "../../state/extension";

const parentProps = defineProps(["node"]);
</script>
