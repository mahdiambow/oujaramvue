<template>
  <ClientOnly>
    <div class="search-select">
      <!-- input -->
      <input
        ref="inputRef"
        v-model="search"
        type="text"
        placeholder="انتخاب استان"
        @focus="open = true"
        class="search-input"
      />

      <!-- clear -->
      <span
        v-if="modelValue"
        class="clear"
        @mousedown.prevent
        @click="clearSelect"
      >
        ✕
      </span>

      <!-- dropdown -->
      <ul v-show="open" class="dropdown">
        <li
          v-for="item in filteredOptions"
          :key="item.id"
          @click="selectItem(item)"
        >
          {{ item.title }}
        </li>

        <li v-if="!filteredOptions.length" class="empty">نتیجه‌ای پیدا نشد</li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const search = ref("");
const open = ref(false);

const filteredOptions = computed(() => {
  if (!search.value) return props.options;
  return props.options.filter((o) => o.title.includes(search.value));
});

const inputRef = ref(null);

const selectItem = (item) => {
  emit("update:modelValue", item);
  search.value = item.title;
  open.value = false;
};

const clearSelect = () => {
  emit("update:modelValue", null);
  search.value = "";
  open.value = false;

  // ✅ خیلی مهم
  nextTick(() => {
    inputRef.value?.blur();
  });
};

watch(
  () => props.modelValue,
  (val) => {
    search.value = val ? val.title : "";
  },
  { immediate: true }
);
</script>
