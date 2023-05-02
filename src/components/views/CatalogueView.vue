<script setup>
import { ref } from "vue";
import CatalogueTemp from "../templates/CatalogueTemp.vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { getSnackbarFlag } = storeToRefs(catalogueStore);
const { clearSnackbarFlag } = catalogueStore;

// Data
const snackbarCloseText = ref("Cerrar");

// Funcs
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
          {{ snackbarCloseText }}
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>
