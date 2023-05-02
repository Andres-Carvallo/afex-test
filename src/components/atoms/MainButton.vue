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
  selectionButton: {
    type: Boolean,
    default: false,
  },
  selectionButtonSecondary: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="main-button"
    :class="{
      'main-button--selection': selectionButton,
      'main-button--selection-secondary': selectionButtonSecondary,
    }"
    @click="handleChange()"
  >
    {{ buttonLabel }}
  </button>
</template>
