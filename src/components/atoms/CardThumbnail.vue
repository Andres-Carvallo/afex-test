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
  <section class="">
    <img :src="thumbnailImg" alt="Youtube Thumbnail" />
    <img :src="closeImg" alt="Close Icon" />
  </section>
</template>
