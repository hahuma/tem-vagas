<template>
  <div
    id="confirm-delete"
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
          <h4>{{ title }}</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true" />
          <div class="modal-body">
            <h4>{{ subject }}: {{ content }}</h4>
          </div>
          <div class="modal-footer border-0">
            <button
              class="btn btn-primary-outline fs-5 py-1 px-4 border-gray-500"
              data-bs-dismiss="modal"
              aria-label="Close"
              aria-hidden="true"
            >
              Não
            </button>
            <button
              type="submit"
              class="btn btn-primary gradient-orange fs-5 py-1 px-4 border-0"
              data-bs-dismiss="modal"
              aria-label="Close"
              aria-hidden="true"
              @click="$emit('action')"
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  title: { String, required },
  subject: { String, required },
  content: { String, required },
})
</script>
