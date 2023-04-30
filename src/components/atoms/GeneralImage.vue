<script setup>
const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
    default: "",
  },
  alt: {
    type: String,
    default: "N/A",
  },
});
</script>

<template>
  <img :src="imgSrc" :alt="alt" />
</template>
