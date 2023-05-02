<script setup>
import { ref, reactive, computed, defineEmits } from "vue";
import TopBar from "../molecules/TopBar.vue";
import CardGrid from "../molecules/CardGrid.vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { getYoutubeDbList } = storeToRefs(catalogueStore);
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
const videoArray = reactive({ array: null });

// Computed
const computedVideoList = computed(() => {
  if (getYoutubeDbList.value) {
    if (
      videoArray.array === null ||
      (videoArray.array !== null &&
        getYoutubeDbList.value.length !== videoArray.array.length)
    ) {
      getVideoDetails();
      return videoArray.array;
    }
    return videoArray.array;
  }
  return null;
});

// Funcs
async function getVideoDetails() {
  await getYoutubeVideoInfo().then((response) => {
    if (response !== null) {
      const videoDetailsList = response;
      const videoListArray = videoDetailsList.map((video) => {
        return {
          dbId: video.dbId,
          id: video.id,
          thumbnail: video.snippet.thumbnails.default.url,
          duration:
            video.contentDetails.duration.split("PT")[1].split("M")[0] +
            ":" +
            video.contentDetails.duration.split("M")[1].split("S")[0],
        };
      });
      videoArray.array = videoListArray;
      return videoListArray;
    }
    return null;
  });
}
</script>

<template>
  <TopBar
    :label-text="labelText"
    :input-placeholder="inputPlaceholder"
    :button-label="buttonLabel"
  />
  <CardGrid
    v-if="computedVideoList"
    :videos-array="computedVideoList"
    @set-info-modal="handleChange('setInfoModal', $event)"
    @delete-video="handleChange('deleteVideo', $event)"
  />
</template>
