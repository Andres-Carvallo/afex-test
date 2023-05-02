<script setup>
import { ref } from "vue";
import MainCatalogue from "../organisms/MainCatalogue.vue";
import MainModal from "../organisms/MainModal.vue";
import { useCatalogueStore } from "../../stores/catalogueStore";
import { useFirestore } from "vuefire";
import { doc, onSnapshot } from "firebase/firestore";

// Store
const catalogueStore = useCatalogueStore();
const { setVideoDetails, setYoutubeDbList } = catalogueStore;
// DDBB
const db = useFirestore();
onSnapshot(doc(db, "youtube-list", "videos"), (doc) => {
  setYoutubeDbList({ videoList: doc.data() });
});
// Data
const showDialog = ref(false);
const showMainModal = ref(false);
const showDeleteModal = ref(false);
const selectedVideoId = ref(null);

// Funcs
function setDetailsModal(videoId) {
  setVideoDetails({ videoId });
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
    <MainModal
      v-if="showMainModal"
      :modal-type="'youtubeModal'"
      @close-modal="showDialog = false"
    />
    <MainModal
      v-if="showDeleteModal"
      :modal-type="'deleteModal'"
      :selected-video="selectedVideoId"
      @close-modal="showDialog = false"
    />
  </v-dialog>
</template>
