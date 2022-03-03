<template>
  <v-navigation-drawer rail expand-on-hover permanent app>
    <v-list nav dense>
      <v-list-item
        active-color="primary"
        v-for="(item, i) in main_pages"
        :key="i"
        :to="item.path"
        :prepend-icon="item.icon"
        :title="item.name"
      />
      <v-divider thickness="3" />
      <v-list-item
        active-color="primary"
        v-for="(item, i) in edit_pages"
        :key="i"
        :to="item.path"
        :prepend-icon="item.icon"
        :title="item.name"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
type NavigationRoute = {
  name: string;
  path: string;
  icon: string;
};

const main_pages: NavigationRoute[] = [
  { name: "home", path: "/", icon: "mdi-home" },
  { name: "about", path: "/about", icon: "mdi-information" },
  { name: "import/export", path: "/save", icon: "mdi-content-save-cog" },
  { name: "errors", path: "/errors", icon: "mdi-alert" },
];
const edit_pages: NavigationRoute[] = [
  { name: "extension", path: "/root", icon: "mdi-cog" },
];
</script>
