<template>
  <v-navigation-drawer rail expand-on-hover permanent app width="130">
    <v-list nav dense>
      <v-list-item
        v-for="(item, i) in navigation_routes"
        :key="i"
        :to="item.path"
        :prepend-icon="item.icon"
        :title="item.name"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const navigation_routes: {
  name: string;
  path: string;
  icon?: string;
}[] = [
  { name: "home", path: "/", icon: "mdi-home" },
  { name: "about", path: "/about", icon: "mdi-information-variant" },
];
</script>
