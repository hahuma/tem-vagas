<template>
  <div
    id="error"
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="error"
    aria-hidden="true"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white text-white p-2">
        <div
          class="card-header bg-gray-600 text-danger border-0 fs-5 py-2 px-3 d-flex flex-row align-items-center justify-content-between"
        >
          <span>Mensagem de Erro</span>
        </div>
        <div class="card-body py-2 px-3 col text-dark">
          <ul v-for="(item, index) in errors" :key="index">
            <li>{{ item }}</li>
          </ul>
        </div>
        <div class="card-footer border-0 py-2 d-flex align-content-end justify-content-end px-3">
          <button
            class="btn btn-danger fs-5 py-1 px-4 border-gray-500"
            data-bs-dismiss="modal"
            aria-label="Close"
            aria-hidden="true"
            v-on="$attrs"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
})
</script>
