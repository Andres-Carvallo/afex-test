<script setup>
import { ref, defineEmits } from "vue";
import TopBar from "../molecules/TopBar.vue";
import CardGrid from "../molecules/CardGrid.vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { getvideosArray } = storeToRefs(catalogueStore);

// Emits
const emit = defineEmits(["setInfoModal", "deleteVideo"]);
const handleChange = (emitType, event) => {
  if (emitType === "setInfoModal") {
    emit("setInfoModal", event);
  }
  if (emitType === "deleteVideo") {
    emit("deleteVideo", event);
  }
};

// Data
const labelText = ref("Añadir nuevo video");
const inputPlaceholder = ref("Añadir");
const buttonLabel = ref("Añadir");
</script>

<template>
  <TopBar
    :label-text="labelText"
    :input-placeholder="inputPlaceholder"
    :button-label="buttonLabel"
  />
  <CardGrid
    v-if="getvideosArray"
    :videos-array="getvideosArray"
    @set-info-modal="handleChange('setInfoModal', $event)"
    @delete-video="handleChange('deleteVideo', $event)"
  />
  <v-progress-circular
    v-else
    indeterminate
    model-value="20"
    size="80"
    color="#136AE4"
  ></v-progress-circular>
</template>
