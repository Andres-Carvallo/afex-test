import { createRouter, createWebHistory } from "vue-router";
import MainCatalogue from "../components/views/CatalogueView.vue";

const mainCatalogue = MainCatalogue;

const routes = [
  {
    path: "/",
    name: "Catalogue",
    component: mainCatalogue,
  },
];
const router = createRouter({
  history: createWebHistory(""),
  routes,
});
export default router;
