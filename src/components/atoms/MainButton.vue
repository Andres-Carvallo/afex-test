<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["buttonClicked"]);
const handleChange = () => {
  emit("buttonClicked");
};
const props = defineProps({
  buttonLabel: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <button class="main-button" @click="handleChange()">
    {{ buttonLabel }}
  </button>
</template>
