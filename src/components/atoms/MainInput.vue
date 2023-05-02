<script setup>
import { ref, defineEmits, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { getClearInputFlag } = storeToRefs(catalogueStore);
const { clearInputFlag } = catalogueStore;

// Emits
const emit = defineEmits(["setInputValue"]);
const handleChange = (event) => {
  if (event) {
    emit("setInputValue", event.target.value);
    inputValue.value = event.target.value;
    return inputValue.value;
  }
  return emit("setInputValue", event);
};
// Data
const inputValue = ref("");
// watchers
watch(
  () => getClearInputFlag.value,
  (currentValue) => {
    if (currentValue) {
      inputValue.value = "";
      clearInputFlag({ boolean: false });
      handleChange(null);
    }
  }
);
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <input
    class="main-input"
    type="text"
    :value="inputValue"
    :placeholder="placeholder"
    @input="handleChange($event)"
  />
</template>
