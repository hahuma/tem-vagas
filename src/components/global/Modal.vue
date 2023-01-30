<template>
  <div
    :id="id"
    class="modal fade"
    tabindex="-1"
    :aria-labelledby="id"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-hidden="false"
  >
    <div v-bind="$attrs" :class="className">
      <div :class="['modal-content']">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: { required: true, type: String },
  className: {
    type: String,
    default: () => 'modal-lg modal-dialog modal-dialog-scrollable modal-dialog-centered',
  },
  content: { type: Boolean, default: () => true },
})
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>
