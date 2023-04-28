<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <p>{{ text }}</p>
</template>
