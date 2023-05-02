<script setup>
import ModalHeader from "../molecules/ModalHeader.vue";
import ModalContent from "../molecules/ModalContent.vue";
import { useFirestore } from "vuefire";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { ref, defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// DB
const db = useFirestore();

// Emits
const emit = defineEmits(["closeModal"]);
const handleChange = () => {
  emit("closeModal");
};

// props
const props = defineProps({
  modalType: {
    type: String,
    required: true,
    default: null,
  },
  selectedVideo: {
    type: String,
    default: null,
  },
});

// Stores
const catalogueStore = useCatalogueStore();
const { getYoutubeDetailInfo } = storeToRefs(catalogueStore);
const { deleteYoutubeVideo } = catalogueStore;

// Funcs
function setVideoInfo() {
  if (props.modalType === "youtubeModal") {
    const videoDetails = {
      id: getYoutubeDetailInfo.value.id,
      title: getYoutubeDetailInfo.value.snippet.title,
      description: getYoutubeDetailInfo.value.snippet.description,
    };
    return videoDetails;
  }
  return null;
}
function deleteVideo() {
  if (props.modalType === "deleteModal") {
    const listRef = doc(db, "youtube-list", "videos");

    // Remove "age" field from the document
    const fieldToDelete = {};
    const fieldId = props.selectedVideo;
    fieldToDelete[fieldId] = deleteField();
    updateDoc(listRef, fieldToDelete);
    deleteYoutubeVideo({ videoDbId: props.selectedVideo });
    handleChange();
  }
}

// Data
const videoInfo = ref(setVideoInfo());
const deleteModalTitle = ref("¿Seguro que quieres eliminar este video?");
const buttonTextObject = ref({
  cancel: "Cancelar",
  delete: "Eliminar",
});
</script>

<template>
  <v-card
    class="main-modal"
    :class="{ 'main-modal--delete-modal': props.modalType !== 'youtubeModal' }"
  >
    <ModalHeader @close-modal="handleChange" />
    <ModalContent
      :id="props.modalType === 'youtubeModal' ? videoInfo.id : null"
      :modal-type="props.modalType"
      :title="
        props.modalType === 'youtubeModal' ? videoInfo.title : deleteModalTitle
      "
      :description="
        props.modalType === 'youtubeModal' ? videoInfo.description : null
      "
      :button-text-object="buttonTextObject"
      @delete-video="deleteVideo"
      @close-modal="handleChange"
    />
  </v-card>
</template>
