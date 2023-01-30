<template>
  <div class="row">
    <div class="d-flex flex-column border border-2 border-radius p-3 align-items-center justify-content-center w-100">
      <div class="d-flex text-uppercase fw-bold align-items-center justify-content-between pb-2 border-primary w-100">
        <span>Cursos</span>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <table class="table m-0">
          <thead>
            <tr>
              <th>Título</th>
              <th>Área</th>
              <th>Instituição</th>
              <th v-if="!!form.editing">
                <div class="d-flex justify-content-center">Ações</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in store.data.courses" :key="index">
              <tr v-if="!item.deleted">
                <td width="30%">{{ item.title }}</td>
                <td width="10%">{{ item.knowledge_area }}</td>
                <td width="10%">{{ item.institution }}</td>
                <td v-if="!!form.editing">
                  <div class="d-flex justify-content-center">
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#course-modal"
                      @click="editCourse(item)"
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
          <NewSubRegister @click="initCourse" text="Adicionar Curso" reference="#course-modal" />
        </div>
      </div>
    </div>
  </div>

  <Modal id="course-modal" class-name="modal-dialog modal-dialog-centered">
    <div class="modal-header border-0">
      <h2 class="h4 modal-title">Curso</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <form id="course-form" autocomplete="off" @submit.prevent="insertCourse">
      <div class="modal-body overflow-visible">
        <div class="row">
          <label class="form-label" for="course-title">Título do Curso</label>
          <input
            id="course-title"
            v-model="course.title"
            type="text"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          />
        </div>
        <div class="row">
          <label for="course-knowledge_area_id" class="form-label">Área do Conhecimento</label>
          <select
            class="form-select border-gray-500"
            :disabled="!form.editing"
            v-model="course.knowledge_area_id"
            id="course-knowledge_area_id"
          >
            <option v-for="(option, index) in store.smallSelects.knowledgeAreas" :key="index" :value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>

        <div class="row">
          <label class="form-label" for="course-institution">Instituição de Ensino</label>
          <input
            id="course-institution"
            v-model="course.institution"
            type="text"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          />
        </div>

        <div class="row">
          <label class="form-label" for="course-description">Descrição</label>
          <textarea
            id="course-description"
            v-model="course.description"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          ></textarea>
        </div>

        <div class="row">
          <label class="form-label" for="course-conclusion_year">Ano de conclusão</label>
          <input
            id="course-conclusion_year"
            v-model="course.conclusion_year"
            v-mask="'##'"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          />
        </div>

        <div class="row">
          <label class="form-label" for="course-quantity-hours">Carga horária</label>
          <input
            id="course-quantity-hours"
            v-model="course.quantity_hours"
            v-mask="'##'"
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
        form="course-form"
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
      <h4>Deseja excluir</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <div class="modal-body">
      <h4>{{ toDelete.title }}?</h4>
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
        @click="deleteCourse"
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
const course = ref({})

const initCourse = () => {
  course.value.id = null
  course.value.knowledge_area_id = ''
  course.value.title = ''
  course.value.institution = ''
  course.value.description = ''
  course.value.quantity_hours = 0
  course.value.conclusion_year = ''
  course.value.deleted = false
}

const toDelete = reactive({
  index: null,
  title: '',
})

const editCourse = (item) => {
  course.value.id = item.id
  course.value.knowledge_area_id = item.knowledge_area_id
  course.value.title = item.title
  course.value.institution = item.institution
  course.value.description = item.description
  course.value.quantity_hours = item.quantity_hours
  course.value.deleted = item.deleted
}

const confirmDeletion = ({ index, title }) => {
  toDelete.index = index
  toDelete.title = title
}

const deleteCourse = () => {
  if (toDelete.index !== null) {
    store.removeOfCourses(toDelete.index)
    toDelete.index = null
  }
}

const validForm = computed(() => {
  return course.value.knowledge_area_id && course.value.title && course.value.institution
})

// const hasErrorForm = () => {
//   if (course.value.knowledge_area_id === '') {
//     errorMessages.value.push('Informe a área do curso')
//   }

//   if (course.value.title === '') {
//     errorMessages.value.push('Informe o título do curso')
//   }

//   if (course.value.description === '') {
//     errorMessages.value.push('Informe a descrição do curso')
//   }

//   if (course.value.institution === '') {
//     errorMessages.value.push('Informe a instituição que realizou o curso')
//   }

//   if (errorMessages.value.length) {
//     hasError.value = true
//     return true
//   }

//   return false
// }

const insertCourse = () => {
  store.insertCourse(course.value)
}

onMounted(() => {
  initCourse()
})
</script>
