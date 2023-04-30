<script setup>
import YouTube from "vue3-youtube";
const props = defineProps({
  videoId: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <YouTube
    ref="youtube"
    width="492"
    height="308"
    :src="`https://www.youtube.com/watch?v=${videoId}`"
    @ready="onReady"
  />
</template>
