<script setup>
import MainLabel from "../atoms/MainLabel.vue";
import MainButton from "../atoms/MainButton.vue";
import YouTube from "../atoms/YoutubeDisplay.vue";

//Emits
const emit = defineEmits(["closeModal", "deleteVideo"]);
const handleChange = (emitType, videoId) => {
  if (emitType === "closeModal") {
    emit("closeModal", videoId);
  }
  if (emitType === "deleteVideo") {
    emit("deleteVideo", videoId);
  }
};

// Props
const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    default: "No Info",
  },
  modalType: {
    type: String,
    required: true,
    default: null,
  },
  buttonTextObject: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <section v-if="modalType === 'youtubeModal'" class="modal-content">
    <YouTube :video-id="id" />
    <section class="modal-content--info">
      <MainLabel title :text="title" />
      <MainLabel content :text="description" />
    </section>
  </section>
  <section v-if="modalType === 'deleteModal'" class="modal-content">
    <section class="modal-content--info">
      <MainLabel title :text="title" />
      <div class="modal-content--info--button-wrapper">
        <MainButton
          selection-button-secondary
          :button-label="buttonTextObject.cancel"
          @button-clicked="handleChange('closeModal')"
        />
        <MainButton
          style="margin-left: 29px"
          selection-button
          :button-label="buttonTextObject.delete"
          @button-clicked="handleChange('deleteVideo')"
        />
      </div>
    </section>
  </section>
</template>
