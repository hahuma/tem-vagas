<template>
  <div class="d-flex justify-content-between align-items-center w-100">
    <div class="d-flex align-items-center justify-content-center">
      <button
        class="btn btn-primary p-2 m-0 me-2 d-lg-none"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>
      <h3 class="m-0 me-3 fs-4">{{ title }}</h3>
    </div>

    <div class="search-input-group">
      <span for="search" class="search-input-group--icon">
        <i class="bi bi-search"></i>
      </span>
      <input
        id="search"
        :value="modelValue"
        type="search"
        class="search-input-group--control"
        placeholder="Pesquisar"
        @input="updateValue"
      />
      <button type="button" class="search-input-group--button" data-bs-toggle="modal" data-bs-target="#advanced-search">
        <i class="bi bi-filter m-0 fs-4"></i>
      </button>
    </div>

    <div class="new-button-container">
      <button id="InsertButton" class="new-button" type="button" @click="$emit('action', 'insert')">
        Incluir
        <i class="bi bi-plus-circle-fill"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { String, default: "Título do formulário" },
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
