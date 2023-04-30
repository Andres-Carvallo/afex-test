<script setup>
import { ref } from "vue";
import GeneralImage from "./GeneralImage.vue";
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
    <GeneralImage
      class="thumbnail--img"
      :img-src="thumbnailImg"
      :alt="'Youtube Thumbnail'"
    />
    <GeneralImage
      class="thumbnail--close"
      :img-src="closeImg"
      :alt="'Close Icon'"
    />
    <p class="thumbnail--duration">{{ duration }}</p>
  </section>
</template>
