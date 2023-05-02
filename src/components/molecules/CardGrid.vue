<script setup>
import { defineEmits } from "vue";
import CardThumbnail from "../atoms/CardThumbnail.vue";

//Emits
const emit = defineEmits(["setInfoModal", "deleteVideo"]);
const handleChange = (emitType, videoId) => {
  if (emitType === "setModal") {
    emit("setInfoModal", videoId);
  }
  if (emitType === "deleteVideo") {
    emit("deleteVideo", videoId);
  }
};
// Props
const props = defineProps({
  videosArray: {
    type: Array,
    required: true,
    default: null,
  },
});
</script>

<template>
  <section class="card-grid">
    <div v-for="(video, index) in videosArray" :key="index">
      <CardThumbnail
        :thumbnail-img="video.thumbnail"
        :duration="video.duration"
        @delete-video="handleChange('deleteVideo', video.dbId)"
        @set-modal="handleChange('setModal', video.id)"
      />
    </div>
  </section>
</template>
