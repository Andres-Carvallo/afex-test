<script setup>
import MainLabel from "../atoms/MainLabel.vue";
const props = defineProps({
  labelText: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <MainLabel :text="labelText" />
</template>
