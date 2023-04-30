<script setup>
import { ref } from "vue";
import MainLabel from "../atoms/MainLabel.vue";
import MainInput from "../atoms/MainInput.vue";
import MainButton from "../atoms/MainButton.vue";
import { useCatalogueStore } from "../../stores/catalogueStore";

const catalogueStore = useCatalogueStore();
const MainInputValue = ref("");
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

function setVideo() {
  catalogueStore.setYoutubeVideo({ url: MainInputValue.value });
}
function setInputValue(inputValue) {
  MainInputValue.value = inputValue;
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
  </section>
</template>
