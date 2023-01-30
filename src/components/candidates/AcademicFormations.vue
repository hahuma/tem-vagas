<template>
  <div class="row">
    <div class="d-flex flex-column border border-2 border-radius p-3 align-items-center justify-content-center w-100">
      <div class="d-flex text-uppercase fw-bold align-items-center justify-content-between pb-2 border-primary w-100">
        <span>Formação Educacional</span>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <table class="table m-0">
          <thead>
            <tr>
              <th>Título</th>
              <th>Instituição</th>
              <th>Conclusão</th>
              <th v-if="!!form.editing">
                <div class="d-flex justify-content-center">Ações</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in store.data.academicFormations" :key="index">
              <tr v-if="!item.deleted">
                <td width="50%">{{ item.title }}</td>
                <td width="30%">{{ item.institution }}</td>
                <td width="10%">{{ item.conclusion_year }}</td>
                <td v-if="!!form.editing">
                  <div class="d-flex justify-content-center">
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#academic-formation-modal"
                      @click="editFormation(item)"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-deletion-modal"
                      @click="confirmDeletion({ index, title: item.title })"
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
          <NewSubRegister
            @click="initAcademicFormation"
            text="Incluir Formação Acadêmica"
            reference="#academic-formation-modal"
          />
        </div>
      </div>
    </div>
  </div>

  <Modal id="academic-formation-modal" class-name="modal-dialog modal-dialog-centered">
    <div class="modal-header border-0">
      <h2 class="h4 modal-title">Formação Educacional</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <form id="academic-formation-form" autocomplete="off" @submit.prevent="insertAcademicFormation">
      <div class="modal-body overflow-visible">
        <div class="row">
          <label class="form-label" for="academic-formation-title">Título</label>
          <input
            id="academic-formation-title"
            v-model="academicFormation.title"
            type="text"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          />
        </div>

        <div class="row">
          <label class="form-label" for="academic-formation-institution">Instituição</label>
          <input
            id="academic-formation-institution"
            v-model="academicFormation.institution"
            type="text"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          />
        </div>

        <div class="row">
          <label class="form-label" for="academic-formation-conclusion_year">Conclusão</label>
          <input
            id="academic-formation-conclusion_year"
            v-model="academicFormation.conclusion_year"
            v-mask="'####'"
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
        form="academic-formation-form"
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
      <h4>EXCLUSÃO DE FORMAÇÃO ACADÊMICA</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <div class="modal-body">
      <h4>TÍTULO: {{ toDelete.title }}</h4>
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
        @click="deleteAcademicFormation"
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

const academicFormation = ref({})

const initAcademicFormation = () => {
  academicFormation.value.id = null
  academicFormation.value.title = ''
  academicFormation.value.description = ''
  academicFormation.value.institution = ''
  academicFormation.value.conclusion_year = ''
  academicFormation.value.deleted = false
}

const toDelete = reactive({
  index: null,
  title: '',
})

const insertAcademicFormation = async () => {
  store.insertAcademicFormation(academicFormation.value)
}

const editFormation = (item) => {
  academicFormation.value.id = item.id
  academicFormation.value.title = item.title
  academicFormation.value.description = item.description
  academicFormation.value.institution = item.institution
  academicFormation.value.conclusion_year = item.conclusion_year
  academicFormation.value.deleted = item.deleted
}

const confirmDeletion = ({ index, title }) => {
  toDelete.index = index
  toDelete.title = title
}

const deleteAcademicFormation = () => {
  if (toDelete.index !== null) {
    store.removeOfAcademicFormations(toDelete.index)
    toDelete.index = null
  }
}

const validForm = computed(() => {
  return academicFormation.value.title && academicFormation.value.institution
})

// const hasErrorForm = () => {
//   if (academicFormation.value.title === '') {
//     errorMessages.value.push('Informe o título da formação')
//   }

//   if (academicFormation.value.institution === '') {
//     errorMessages.value.push('Informe a instituição de ensino')
//   }

//   if (errorMessages.value.length) {
//     hasError.value = true
//     return true
//   }

//   return false
// }

onMounted(() => {
  initAcademicFormation()
})
</script>
