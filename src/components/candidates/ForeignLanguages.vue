<template>
  <div class="row">
    <div class="d-flex flex-column border border-2 border-radius p-3 align-items-center justify-content-center w-100">
      <div class="d-flex text-uppercase fw-bold align-items-center justify-content-between pb-2 border-primary w-100">
        <span>Línguas Estrangeiras</span>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <table class="table m-0">
          <thead>
            <tr>
              <th>Idioma</th>
              <th v-if="!!form.editing">
                <div class="d-flex justify-content-center">Ações</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in store.data.foreignLanguages" :key="index">
              <tr v-if="!item.deleted">
                <td>{{ item.name }}</td>
                <td v-if="!!form.editing">
                  <div class="d-flex justify-content-center">
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-deletion-modal"
                      @click="confirmDeletion({ index, title: item.name })"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div
          v-if="!!form.editing"
          class="d-flex align-items-center justify-content-center w-100 py-2 border-bottom border-2"
        >
          <NewSubRegister @click="initForeignLanguage" text="Adicionar Idioma" reference="#foreign-languages-modal" />
        </div>
      </div>
    </div>
  </div>

  <Modal id="foreign-languages-modal" class-name="modal-dialog modal-dialog-centered">
    <div class="modal-header border-0">
      <h2 class="h4 modal-title">Idiomas</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <form id="course-form" autocomplete="off" @submit.prevent="insertForeignLanguage">
      <div class="modal-body overflow-visible">
        <div class="row">
          <label class="form-label" for="course-title">Idioma</label>
          <input
            id="foreign-languages-name"
            v-model="foreignLanguages.name"
            type="text"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          />
        </div>
      </div>
    </form>
    <div class="modal-footer border-0 d-flex justify-content-between align-items-center">
      <button
        class="btn btn-primary-outline fs-5 py-1 px-4 border-gray-500"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
      >
        Cancelar
      </button>
      <button
        :disabled="!validForm"
        type="submit"
        form="foreign-languages-form"
        class="btn btn-primary gradient-orange fs-5 py-1 px-4 border-0"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
      >
        Salvar
      </button>
    </div>
  </Modal>

  <Modal id="confirm-deletion-modal">
    <div class="modal-header border-0">
      <h4>EXCLUSÃO DE IDIOMAS</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <div class="modal-body">
      <h4>IDIOMA: {{ toDelete.title }}?</h4>
    </div>
    <div class="modal-footer border-0">
      <button
        class="btn btn-primary-outline fs-5 py-1 px-4 border-gray-500"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
        @click="
          () => {
            toDelete.index = null
            toDelete.title = ''
          }
        "
      >
        Não
      </button>
      <button
        type="submit"
        class="btn btn-primary gradient-orange fs-5 py-1 px-4 border-0"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
        @click="deleteForeignLanguage"
      >
        Sim
      </button>
    </div>
  </Modal>

  <div v-if="hasError">
    <ShowErrors :errors="errorMessages" @click="hasError = false" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/formStore'
import { useCandidateStore } from '@/stores/candidateStore'
import Modal from '@/components/global/Modal.vue'
import ShowErrors from '@/components/global/ShowErrors.vue'
import NewSubRegister from '@/components/global/NewSubRegister.vue'

const hasError = ref(false)
let errorMessages = ref([])

const form = useFormStore()
const store = useCandidateStore()
const foreignLanguages = ref({})

const initForeignLanguage = () => {
  foreignLanguages.value.id = null
}

const toDelete = reactive({
  index: null,
  title: '',
})

const confirmDeletion = ({ index, title }) => {
  toDelete.index = index
  toDelete.title = title
}

const deleteForeignLanguage = () => {
  if (toDelete.index !== null) {
    store.removeOfForeignLanguages(toDelete.index)
    toDelete.index = null
  }
}

const validForm = computed(() => {
  return foreignLanguages.value.id
})

const insertForeignLanguage = () => {
  store.insertForeignLanguage(foreignLanguages.value)
}

onMounted(() => {
  initForeignLanguage()
})
</script>
