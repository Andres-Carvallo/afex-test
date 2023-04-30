<script setup>
import { ref } from "vue";
import MainCatalogue from "../organisms/MainCatalogue.vue";
import MainModal from "../organisms/MainModal.vue";
import DeleteVideoModal from "../organisms/DeleteVideoModal.vue";

import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { setVideoDetails } = catalogueStore;
// Data
const showDialog = ref(false);
const showMainModal = ref(false);
const showDeleteModal = ref(false);
const selectedVideoId = ref(false);

// Funcs
function setDetailsModal(videoId) {
  setVideoDetails(videoId);
  showDeleteModal.value = false;
  showDialog.value = true;
  showMainModal.value = true;
}

function setDeleteModal(videoId) {
  selectedVideoId.value = videoId;
  showMainModal.value = false;
  showDialog.value = true;
  showDeleteModal.value = true;
}
</script>

<template>
  <MainCatalogue
    @set-info-modal="setDetailsModal"
    @delete-video="setDeleteModal"
  />
  <v-dialog v-model="showDialog" width="auto">
    <MainModal v-if="showMainModal" @close-modal="showDialog = false" />
    <DeleteVideoModal
      v-if="showDeleteModal"
      @close-modal="showDialog = false"
    />
  </v-dialog>
</template>
