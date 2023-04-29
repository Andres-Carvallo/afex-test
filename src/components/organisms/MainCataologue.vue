<script setup>
import { ref, onMounted } from "vue";
import TopBar from "../molecules/TopBar.vue";
import CardGrid from "../molecules/CardGrid.vue";
import { useCatalogueStore } from "../../stores/catalogueStore";

const labelText = ref("Añadir nuevo video");
const inputPlaceholder = ref("Añadir");
const buttonLabel = ref("Añadir");
let videosArray;
onMounted(() => {
  const catalogueStore = useCatalogueStore();
  catalogueStore.getYoutubeVideoInfo().then(() => {
    const videoDetailsList = catalogueStore.getYoutubeInfoList;
    const videoListArray = videoDetailsList.map((video) => {
      return {
        id: video.id,
        thumbnail: video.snippet.thumbnails.default.url,
      };
    });
    videosArray = ref(videoListArray);
  });
});
</script>

<template>
  <TopBar
    :label-text="labelText"
    :input-placeholder="inputPlaceholder"
    :button-label="buttonLabel"
  />
  <CardGrid v-if="videosArray" :videos-array="videosArray" />
</template>
