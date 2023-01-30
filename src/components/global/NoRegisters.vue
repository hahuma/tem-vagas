<template>
  <div class="h-100 d-flex justify-content-center align-items-start align-items-md-center">
    <div
      class="card p-5 d-flex align-items-center border-top border-start-0 border-bottom-0 border-end-0 border-5 border-gray-800"
    >
      <p class="fs-4 text-center w-75 lh-1 mb-3">
        <b>{{ text }}</b>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>
