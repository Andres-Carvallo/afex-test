<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <input class="main-input" type="text" :placeholder="placeholder" />
</template>
