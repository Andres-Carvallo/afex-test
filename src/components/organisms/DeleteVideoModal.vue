<script setup>
import ModalHeader from "../molecules/ModalHeader.vue";

import { ref, defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Emits
const emit = defineEmits(["closeModal"]);
const handleChange = () => {
  emit("closeModal");
};

// Stores
const catalogueStore = useCatalogueStore();
const { getYoutubeDetailInfo } = storeToRefs(catalogueStore);
</script>

<template>
  <v-card class="main-modal">
    <ModalHeader @close-modal="handleChange" />
  </v-card>
</template>
