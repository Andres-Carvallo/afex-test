<script setup>
import MainLabel from "../atoms/MainLabel.vue";
import MainInput from "../atoms/MainInput.vue";
import MainButton from "../atoms/MainButton.vue";

const props = defineProps({
  labelText: {
    type: String,
    required: true,
    default: "",
  },
  inputPlaceholder: {
    type: String,
    required: true,
    default: "",
  },
  buttonLabel: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <section class="top-bar">
    <MainLabel :text="labelText" />
    <section class="top-bar--search-section">
      <MainInput :placeholder="inputPlaceholder" />
      <MainButton :button-label="buttonLabel" />
    </section>
  </section>
</template>
