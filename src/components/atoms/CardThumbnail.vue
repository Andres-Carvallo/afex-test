<script setup>
import { ref, defineEmits } from "vue";
import GeneralImage from "./GeneralImage.vue";

// Emits
const emit = defineEmits(["deleteVideo", "setModal"]);
const handleChange = (emitType) => {
  if (emitType === "deleteVideo") {
    emit("deleteVideo");
  }
  if (emitType === "setModal") {
    emit("setModal");
  }
};
// Data
const closeImg = ref(new URL("../../assets/close.svg", import.meta.url).href);
// Props
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
</script>

<template>
  <section class="thumbnail">
    <GeneralImage
      class="thumbnail--img"
      :img-src="thumbnailImg"
      :alt="'Youtube Thumbnail'"
      @click="handleChange('setModal')"
    />
    <GeneralImage
      class="thumbnail--close"
      :img-src="closeImg"
      :alt="'Close Icon'"
      @click="handleChange('deleteVideo')"
    />
    <p class="thumbnail--duration">{{ duration }}</p>
  </section>
</template>
