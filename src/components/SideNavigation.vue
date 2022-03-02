<template>
  <v-navigation-drawer rail expand-on-hover permanent app>
    <v-list nav dense>
      <v-list-item
        active-color="primary"
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
type NavigationRoute = {
  name: string;
  path: string;
  icon?: string;
};

const navigation_routes: NavigationRoute[] = [
  { name: "home", path: "/", icon: "mdi-home" },
  { name: "about", path: "/about", icon: "mdi-information-variant" },
];
</script>
