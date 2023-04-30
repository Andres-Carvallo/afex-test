<script setup>
import { ref, defineEmits } from "vue";
import GeneralImage from "../atoms/GeneralImage.vue";
const emit = defineEmits(["closeModal"]);
const handleChange = () => {
  emit("closeModal");
};

const closeImg = ref(
  new URL("../../assets/close-dark.svg", import.meta.url).href
);
</script>

<template>
  <section class="modal-header">
    <GeneralImage
      class="modal-header--close"
      :img-src="closeImg"
      :alt="'Close Icon'"
      @click="handleChange"
    />
  </section>
</template>
