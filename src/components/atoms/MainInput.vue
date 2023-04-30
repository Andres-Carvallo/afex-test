<script setup>
import { ref, defineEmits, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCatalogueStore } from "../../stores/catalogueStore";

// Store
const catalogueStore = useCatalogueStore();
const { getClearInputFlag } = storeToRefs(catalogueStore);
const { setClearInputFlag } = catalogueStore;

// Emits
const emit = defineEmits(["setInputValue"]);
const handleChange = (event) => {
  emit("setInputValue", event.target.value);
  inputValue.value = event.target.value;
};
// Data
const inputValue = ref("");
// watchers
watch(
  () => getClearInputFlag.value,
  (currentValue) => {
    if (currentValue) {
      inputValue.value = "";
      setClearInputFlag({ boolean: false });
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
    @input="handleChange"
  />
</template>
