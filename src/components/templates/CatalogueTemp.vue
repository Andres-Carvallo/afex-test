<script setup>
import { ref } from "vue";
import MainCatalogue from "../organisms/MainCatalogue.vue";
import MainModal from "../organisms/MainModal.vue";
import { useCatalogueStore } from "../../stores/catalogueStore";

const catalogueStore = useCatalogueStore();
const showDialog = ref(false);

function showDetailsModal(videoId) {
  catalogueStore.setVideoDetails(videoId);
  showDialog.value = true;
}
</script>

<template>
  <MainCatalogue @set-info-modal="showDetailsModal($event)" />
  <v-dialog v-model="showDialog" width="auto">
    <MainModal @close-modal="showDialog = false" />
  </v-dialog>
</template>
