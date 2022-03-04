import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import ImportExportPage from "../views/ImportExportPage.vue";

import ExtensionPage from "../views/editors/ExtensionPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/save",
    name: "import-export",
    component: ImportExportPage,
  },
  {
    path: "/ext",
    name: "extension settings",
    component: ExtensionPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
