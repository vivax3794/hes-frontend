<template>
  <v-navigation-drawer permanent>
    <v-list>
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
        @click="ext.createNewNodeFolder(ext.nodeFolders)"
      />
      <v-divider />
      <NodeList v-for="(item, i) in ext.nodeFolders" :key="i" :node="item" />
    </v-list>
  </v-navigation-drawer>
  <div v-if="selectedNode !== null">
    <v-card>
      <v-tabs v-model="tabs" slider-color="secondary">
        <v-tab value="main">Main Settings</v-tab>
        <v-tab value="ports">Ports</v-tab>
        <v-tab value="sec">Security</v-tab>
      </v-tabs>
      <v-window v-model="tabs">
        <v-window-item value="main">
          <v-container>
            <MainSettings :nodeID="selectedNode.id" />
          </v-container>
        </v-window-item>
        <v-window-item value="ports">
          <v-container>
            <PortSettings :nodeID="selectedNode.id" />
          </v-container>
        </v-window-item>
        <v-window-item value="sec">
          <v-container>
            <SecuritySettings :nodeID="selectedNode.id" />
          </v-container>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, ComputedRef } from "vue";
import { useRoute } from "vue-router";

import router from "../../router";
import state from "../../state";
import Node from "../../state/node";

import NodeList from "../../components/NodeEditor/NodeList.vue";

import MainSettings from "../../components/NodeEditor/MainSettings.vue";
import PortSettings from "../../components/ExtensionEditor/PortSettings.vue";
import SecuritySettings from "../../components/ExtensionEditor/SecuritySettings.vue";

const tabs = ref("main");

const ext = state.value.currentExtension;
const route = useRoute();
const selectedNode: ComputedRef<Node | null> = computed(
  () => ext.nodesMapping[route.params.nodeID as string] ?? null
);

function createNode(): void {
  const newId = ext.createNewNode(ext.nodeFolders);
  console.log("redirected to new node:", newId);
  router.push(`/computer/${newId}`);
}
</script>
