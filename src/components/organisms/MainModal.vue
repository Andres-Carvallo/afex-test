<script setup>
import ModalHeader from "../molecules/ModalHeader.vue";
import ModalContent from "../molecules/ModalContent.vue";
import { ref, defineEmits } from "vue";
import { useCatalogueStore } from "../../stores/catalogueStore";

const setCloseModalEmit = defineEmits(["closeModal"]);
const catalogueStore = useCatalogueStore();
const videoDetails = {
  id: catalogueStore.getYoutubeDetailInfo.id,
  title: catalogueStore.getYoutubeDetailInfo.snippet.title,
  description: catalogueStore.getYoutubeDetailInfo.snippet.description,
};
console.log(videoDetails);
const videoInfo = ref(videoDetails);
</script>

<template>
  <v-card class="main-modal">
    <ModalHeader @close-modal="$emit('closeModal')" />
    <ModalContent
      :id="videoInfo.id"
      :title="videoInfo.title"
      :description="videoInfo.description"
    />
  </v-card>
</template>
