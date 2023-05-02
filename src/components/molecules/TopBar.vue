<script setup>
import { ref } from "vue";
import MainLabel from "../atoms/MainLabel.vue";
import MainInput from "../atoms/MainInput.vue";
import MainButton from "../atoms/MainButton.vue";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { setYoutubeVideo } = catalogueStore;

// Data
const mainInputValue = ref("");
const mainInputError = ref(false);
const errorText = ref(
  "Debe ingresar una URL Valida, Ej: https://www.youtube.com/watch?v=ei2n9iSyL38 o https://youtu.be/hjw7pCs4tD0"
);
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
  console.log(mainInputValue.value);
  if (
    (mainInputValue.value &&
      mainInputValue.value.includes("watch?v=") &&
      mainInputValue.value.includes("youtube")) ||
    (mainInputValue.value && mainInputValue.value.includes("youtu.be"))
  ) {
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
      :text="errorText"
    />
  </section>
</template>
