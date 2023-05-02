<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: "",
  },
  title: {
    type: Boolean,
    default: false,
  },
  content: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="main-label"
    :class="{
      'main-label--title': title,
      'main-label--content': content,
      'main-label--error': error,
    }"
  >
    {{ text }}
  </div>
</template>
