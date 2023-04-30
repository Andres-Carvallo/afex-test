<script setup>
import { ref, onMounted, defineEmits, watch } from "vue";
import TopBar from "../molecules/TopBar.vue";
import CardGrid from "../molecules/CardGrid.vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { getYoutubeInfoList } = storeToRefs(catalogueStore);
const { getYoutubeVideoInfo } = catalogueStore;

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
const videosArray = ref(null);

// watchers
watch(
  () => getYoutubeInfoList.value,
  (currentValue, oldValue) => {
    if (oldValue !== null && currentValue.length !== oldValue.length) {
      getVideoDetails();
    }
  }
);
function getVideoDetails() {
  getYoutubeVideoInfo().then(() => {
    const videoDetailsList = getYoutubeInfoList.value;
    const videoListArray = videoDetailsList.map((video) => {
      return {
        id: video.id,
        thumbnail: video.snippet.thumbnails.default.url,
        duration:
          video.contentDetails.duration.split("PT")[1].split("M")[0] +
          ":" +
          video.contentDetails.duration.split("M")[1].split("S")[0],
      };
    });
    videosArray.value = videoListArray;
  });
}

onMounted(() => {
  getVideoDetails();
});
</script>

<template>
  <TopBar
    :label-text="labelText"
    :input-placeholder="inputPlaceholder"
    :button-label="buttonLabel"
  />
  <CardGrid
    v-if="videosArray"
    :videos-array="videosArray"
    @set-info-modal="handleChange('setInfoModal', $event)"
    @delete-video="handleChange('deleteVideo', $event)"
  />
</template>
