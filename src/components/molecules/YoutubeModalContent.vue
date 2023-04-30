<script setup>
import MainLabel from "../atoms/MainLabel.vue";
import YouTube from "../atoms/YoutubeDisplay.vue";
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: null,
  },
  title: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: "No Info",
  },
});
</script>

<template>
  <section class="modal-content">
    <YouTube :video-id="id" />
    <section class="modal-content--info">
      <MainLabel title :text="title" />
      <MainLabel content :text="description" />
    </section>
  </section>
</template>
