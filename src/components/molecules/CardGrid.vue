<script setup>
import { defineEmits } from "vue";
import CardThumbnail from "../atoms/CardThumbnail.vue";

const setModalEmit = defineEmits(["setInfoModal"]);
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
        @click="$emit('setInfoModal', video.id)"
      />
    </div>
  </section>
</template>
