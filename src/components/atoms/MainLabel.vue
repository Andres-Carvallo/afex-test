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
});
</script>

<template>
  <div
    class="main-label"
    :class="{
      'main-label--title': title,
      'main-label--content': content,
    }"
  >
    {{ text }}
  </div>
</template>
