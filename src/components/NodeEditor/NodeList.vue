<template>
  <v-list-group v-if="parentProps.node.children !== undefined">
    <template v-slot:activator="{ props }">
      <v-list-item :title="parentProps.node.name" v-bind="props" />
    </template>

    <v-list-item
      title="New Node"
      append-icon="mdi-plus"
      color="green"
      @click="createNode"
    />

    <v-list-item
      title="New Folder"
      append-icon="mdi-plus"
      color="green"
      @click="ext.createNewNodeFolder(parentProps.node.children)"
    />
    <v-divider />

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
import router from "../../router";
import state from "../../state";

const parentProps = defineProps(["node"]);

const ext = state.value.currentExtension;

function createNode(): void {
  const newId = ext.createNewNode(parentProps.node.children);
  console.log("redirected to new node:", newId);
  router.push(`/computer/${newId}`);
}
</script>
