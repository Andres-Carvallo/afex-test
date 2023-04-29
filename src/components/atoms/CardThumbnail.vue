<script setup>
import { ref } from "vue";
const props = defineProps({
  thumbnailImg: {
    type: String,
    required: true,
    default: "",
  },
  duration: {
    type: String,
    required: true,
    default: "",
  },
});
const closeImg = ref(new URL("../../assets/close.svg", import.meta.url).href);
</script>

<template>
  <section class="thumbnail">
    <img class="thumbnail--img" :src="thumbnailImg" alt="Youtube Thumbnail" />
    <img class="thumbnail--close" :src="closeImg" alt="Close Icon" />
    <p class="thumbnail--duration">{{ duration }}</p>
  </section>
</template>
