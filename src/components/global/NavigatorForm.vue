<template>
  <div class="d-flex justify-content-between align-center w-100 p-3">
    <div class="d-flex align-items-center justify-content-center">
      <h3 class="m-0 me-3">{{ title }}</h3>
    </div>
    <div>
      <button class="action-button edit-button" :disabled="form.editing" @click="$emit('action')">Alterar</button>
      <button class="action-button return-button" :disabled="form.editing" @click="router.go(-1)">
        <!-- <i class="bi bi-arrow-return-left"></i> -->
        Voltar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useFormStore } from "@/stores/formStore";

defineProps({
  title: { String, default: "Título do formulário" },
});

const router = useRouter();
const form = useFormStore();
</script>
