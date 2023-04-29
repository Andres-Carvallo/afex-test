<script setup>
const props = defineProps({
  buttonLabel: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <button class="main-button">{{ buttonLabel }}</button>
</template>
