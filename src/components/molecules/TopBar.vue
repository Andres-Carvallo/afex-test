<script setup>
import { ref } from "vue";
import MainLabel from "../atoms/MainLabel.vue";
import MainInput from "../atoms/MainInput.vue";
import MainButton from "../atoms/MainButton.vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";
import { useFirestore } from "vuefire";
import { doc, setDoc } from "firebase/firestore";

// DB
const db = useFirestore();

// Store
const catalogueStore = useCatalogueStore();
const { getYoutubeDbList } = storeToRefs(catalogueStore);
const { setYoutubeVideo } = catalogueStore;

// Data
const mainInputValue = ref("");
const mainInputError = ref(false);

// Props
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

// Funcs
function setVideo() {
  if (
    mainInputValue.value &&
    mainInputValue.value.includes("watch?v=") &&
    mainInputValue.value.includes("youtube")
  ) {
    const videoRef = doc(db, "youtube-list", "videos");
    const videoObject = {};
    videoObject[getYoutubeDbList.value.length + 1] = mainInputValue.value;
    setDoc(videoRef, videoObject, { merge: true });
    mainInputError.value = false;
    return setYoutubeVideo({ url: mainInputValue.value });
  }
  return (mainInputError.value = true);
}
function setInputValue(inputValue) {
  mainInputValue.value = inputValue;
}
</script>

<template>
  <section class="top-bar">
    <MainLabel :text="labelText" />
    <section class="top-bar--search-section">
      <MainInput
        :placeholder="inputPlaceholder"
        @set-input-value="setInputValue($event)"
      />
      <MainButton :button-label="buttonLabel" @button-clicked="setVideo" />
    </section>
    <MainLabel
      v-if="mainInputError"
      style="margin-top: 4px"
      error
      :text="'Debe ingresar una URL Valida, Ej: https://www.youtube.com/watch?v=ei2n9iSyL38'"
    />
  </section>
</template>
