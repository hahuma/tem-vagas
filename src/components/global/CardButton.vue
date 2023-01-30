<template>
  <button type="button" :class="styles" v-bind="$attrs">
    {{ description }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: () => 'Detalhes',
  },
  outlined: {
    type: Boolean,
    default: false,
  },
})
const styles = computed(() => {
  if (props.outlined) {
    return 'btn btn-outline border-orange border-3 fs-5 py-0 px-2'
  }
  return 'btn btn-primary fs-5 py-0 px-2'
})
</script>
