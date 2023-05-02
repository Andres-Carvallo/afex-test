<script setup>
import CatalogueTemp from "../templates/CatalogueTemp.vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { getSnackbarFlag } = storeToRefs(catalogueStore);
const { clearSnackbarFlag } = catalogueStore;

function getSnackbarColor(snackbarType) {
  if (snackbarType === "error") {
    return "red";
  }
  if (snackbarType === "success") {
    return "green";
  }
  return "gray";
}
</script>

<template>
  <section class="catalogue-template">
    <CatalogueTemp />
    <v-snackbar
      v-model="getSnackbarFlag.status"
      :color="getSnackbarColor(getSnackbarFlag.type)"
    >
      {{ getSnackbarFlag.text }}
      <template #actions>
        <v-btn color="white" variant="text" @click="clearSnackbarFlag">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>
