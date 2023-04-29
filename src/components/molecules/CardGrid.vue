<script setup>
import CardThumbnail from "../atoms/CardThumbnail.vue";
const props = defineProps({
  videosArray: {
    type: Array,
    required: true,
    default: null,
  },
});
</script>

<template>
  <section v-for="(video, index) in videosArray" :key="index" class="">
    <CardThumbnail
      :thumbnail-img="video.thumbnail"
      :duration="video.duration"
    />
  </section>
</template>
