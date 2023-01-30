<template>
  <div class="card bg-white border-0 shadow-sm h-100 w-100">
    <div
      class="card-header bg-gray-200 p-1 border-0 fs-5 my-2 mx-3 d-flex flex-row align-items-center justify-content-between"
    >
      <slot name="header">
        <div v-for="(value, key, index) in content.header" :key="index">
          <span v-if="key != 'status'">
            {{ key }}:
            {{ value }}
          </span>
          <div v-else data-bs-toggle="tooltip" data-bs-placement="top" :title="STATUS[value].info">
            <i :class="`bi ${STATUS[value].icon}`"></i>
          </div>
        </div>
      </slot>
    </div>

    <div class="overflow-hidden mt-2 px-3">
      <slot name="body">
        <div v-for="(value, key, index) in content.body" :key="index" class="row pb-2">
          <div class="font-bold">
            {{ key }}
          </div>
          <div class="text-truncate">
            {{ value }}
          </div>
        </div>
      </slot>
    </div>

    <div class="bg-gray-200 d-flex items-start justify-content-between p-1 fs-5 my-2 mx-3">
      <slot name="footer">
        <div v-for="(value, key, index) in content.footer" :key="index">
          <span>
            {{ value }}
          </span>
        </div>
      </slot>
      <button class="main-button" @click="$emit('action', id)">Detalhes</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: Object,
  id: String,
  action: Event,
})

const STATUS = {
  A: {
    icon: 'bi-bookmark-star',
    info: 'Ativo',
  },
  B: {
    icon: 'bi-bookmark-star',
    info: 'Bloqueado',
  },
  C: {
    icon: 'bi-bookmark-star',
    info: 'Cancelado',
  },
  I: {
    icon: 'bi-bookmark-star',
    info: 'Inativo',
  },
  P: {
    icon: 'bi-bookmark-star',
    info: 'Pendente',
  },
  S: {
    icon: 'bi-bookmark-star',
    info: 'Suspenso',
  },
}
</script>
