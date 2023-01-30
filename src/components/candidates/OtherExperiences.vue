<template>
  <div class="row">
    <div class="d-flex flex-column border border-2 border-radius p-3 align-items-center justify-content-center w-100">
      <div class="d-flex text-uppercase fw-bold align-items-center justify-content-between pb-2 border-primary w-100">
        <span>Outras Experiências</span>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <table class="table m-0">
          <thead>
            <tr>
              <th>Cargo</th>
              <th>Idade</th>
              <th v-if="!!form.editing">
                <div class="d-flex justify-content-center">Ações</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in store.data.otherExperiences" :key="index">
              <tr v-if="!item.deleted">
                <td width="30%">{{ item.occupation }}</td>
                <td width="10%">{{ item.age }}</td>
                <td v-if="!!form.editing">
                  <div class="d-flex justify-content-center">
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-deletion-modal"
                      @click="confirmDeletion({ index, name: item.title })"
                    >
                      <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.763889 12.2222C0.763889 13.0625 1.45139 13.75 2.29167 13.75H8.40278C9.24306 13.75 9.93056 13.0625 9.93056 12.2222V3.05556H0.763889V12.2222ZM10.6944 0.763889H8.02083L7.25694 0H3.4375L2.67361 0.763889H0V2.29167H10.6944V0.763889Z"
                          fill="#FAFAFA"
                        />
                      </svg>
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
          <NewSubRegister text="Adicionar Formação Acadêmica" reference="#academic-formation-modal" />
        </div>
      </div>
    </div>
  </div>

  <Modal id="academic-formation-modal" class-name="modal-dialog modal-dialog-centered">
    <div class="modal-header border-0">
      <h2 class="h4 modal-title">formation</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <form id="registration-form" autocomplete="off" @submit.prevent="insertOtherExperience">
      <div class="modal-body overflow-visible">
        <div class="row">
          <label class="form-label" for="occupation_id">Cargo</label>
          <v-select
            id="occupation_id"
            v-model="otherExperience.occupation_id"
            class="style-chooser"
            label="name"
            :reduce="(option) => option.name"
            :options="occupations"
            :filterable="false"
            :disabled="!form.editing"
            @search="getOccupations"
            @option:selected="(option) => (otherExperience.occupation_id = option.id)"
            @search:focus="getOccupations()"
          >
            <template #option="{ name, knowledge_area }">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <span>{{ name }}</span>
                  <span>{{ knowledge_area }}</span>
                </div>
              </div>
            </template>
            <template #no-options="{ search, searching }">
              <template v-if="searching">
                Não encontrado <em>{{ search }}</em>
              </template>
              <em v-else style="opacity: 0.5">Digite as iniciais do nome</em>
            </template>
          </v-select>
        </div>

        <div class="row">
          <label class="form-label" for="activities">Atividades</label>
          <textarea
            id="activities"
            v-model="otherExperience.activities"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          >
          </textarea>
        </div>

        <div class="row">
          <label class="form-label" for="age">Idade</label>
          <input
            id="age"
            v-model="otherExperience.age"
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
        type="submit"
        form="registration-form"
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
      <h4>{{ idToDelete.title }}?</h4>
    </div>
    <div class="modal-footer border-0">
      <button
        class="btn btn-primary-outline fs-5 py-1 px-4 border-gray-500"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
        @click="
          () => {
            idToDelete.index = null
            idToDelete.title = ''
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
        @click="deleteOtherExperience"
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
import axios from '@/api/axios'
import { ref, reactive, onMounted } from 'vue'
import { useFormStore } from '@/stores/formStore'
import { useCandidateStore } from '@/stores/candidateStore'
import Modal from '@/components/global/Modal.vue'
import ShowErrors from '@/components/global/ShowErrors.vue'
import NewSubRegister from '@/components/global/NewSubRegister.vue'

const hasError = ref(false)
let errorMessages = ref([])

const form = useFormStore()
const store = useCandidateStore()
const occupations = ref([])
const otherExperience = ref({})

const initOtherExperience = () => {
  otherExperience.value.id = null
  otherExperience.value.occupation_id = ''
  otherExperience.value.activities = ''
  otherExperience.value.age = ''
}

const idToDelete = reactive({
  index: null,
  title: '',
})

const confirmDeletion = ({ index, title }) => {
  idToDelete.index = index
  idToDelete.title = title
}

const deleteOtherExperience = () => {
  if (idToDelete.index !== null) {
    store.removeOfOtherExperiences(idToDelete.index)
    idToDelete.index = null
  }
}

const getOccupations = _.debounce((search, loading) => {
  loading(true)
  axios
    .get(`/occupations/${search}`)
    .then(({ data }) => (occupations.value = data.occupations))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false))
}, 500)

const hasErrorForm = () => {
  if (otherExperience.occupation === '') {
    errorMessages.value.push('Informe o cargo')
  }

  if (otherExperience.activities === '') {
    errorMessages.value.push('Informe a atividade')
  }

  if (otherExperience.age === '') {
    errorMessages.value.push('Informe a idade')
  }

  if (errorMessages.value.length) {
    hasError.value = true
    return true
  }

  return false
}

const insertOtherExperience = () => {
  if (!hasErrorForm()) {
    store.insertOtherExperience(otherExperience.value)
    initOtherExperience()
  }
}

onMounted(() => {
  initOtherExperience()
})
</script>
