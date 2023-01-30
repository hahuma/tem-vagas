<template>
  <div class="row">
    <div class="d-flex flex-column border border-2 border-radius p-3 align-items-center justify-content-center w-100">
      <div class="d-flex text-uppercase fw-bold align-items-center justify-content-between pb-2 border-primary w-100">
        <span>Cargos de Interesse</span>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <table class="table m-0">
          <thead>
            <tr>
              <th>Cargo</th>
              <th v-if="!!form.editing">
                <div class="d-flex justify-content-center">Ações</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in store.data.occupationsInterest" :key="index">
              <tr v-if="!item.deleted">
                <td width="30%">{{ item.occupation }}</td>
                <td v-if="!!form.editing">
                  <div class="d-flex justify-content-center">
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#occupations-interest-modal"
                      @click="editOccupationsInterest(item)"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-deletion-modal"
                      @click="confirmDeletion({ index, title: item.occupation })"
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
            @click="initOccupationInterest"
            text="Adicionar Cargos de Interesse"
            reference="#occupation-interest-modal"
          />
        </div>
      </div>
    </div>
  </div>

  <Modal id="occupation-interest-modal" class-name="modal-dialog modal-dialog-centered">
    <div class="modal-header border-0">
      <h2 class="h4 modal-title">Cargo de Interesse</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <form id="occupation-interest-form" autocomplete="off" @submit.prevent="insertOccupationInterest">
      <div class="modal-body overflow-visible">
        <div class="row">
          <label class="form-label" for="occupation_id">Cargo</label>
          <v-select
            id="occupation_id"
            v-model="occupationInterest.occupation"
            class="style-chooser"
            label="name"
            :reduce="(option) => option.name"
            :options="occupations"
            :filterable="false"
            :disabled="!form.editing"
            @search="getOccupations"
            @option:selected="(option) => (occupationInterest.occupation_id = option.id)"
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
        form="occupation-interest-form"
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
      <h4>EXCLUSÃO DE CARGO DE INTERESSE</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <div class="modal-body">
      <h4>CARGO: {{ toDelete.title }}?</h4>
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
        @click="deleteOccupationInterest"
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
const occupations = ref([])
const occupationInterest = ref({})

const initOccupationInterest = () => {
  occupationInterest.value.id = null
  occupationInterest.value.occupation_id = ''
  occupationInterest.value.occupation = ''
}

const toDelete = reactive({
  index: null,
  title: '',
})

const confirmDeletion = ({ index, title }) => {
  toDelete.index = index
  toDelete.title = title
}

const insertOccupationInterest = () => {
  store.insertOccupationInterest(occupationInterest.value)
}

const editOccupationsInterest = (item) => {
  occupationInterest.value.id = item.id
  occupationInterest.value.occupation_id = item.occupation_id
}

const deleteOccupationInterest = () => {
  if (toDelete.index !== null) {
    store.removeOfOccupationsInterest(toDelete.index)
    toDelete.index = null
  }
}

const getOccupations = _.debounce((search, loading) => {
  if (!search) return
  axios
    .get(`/occupations/search/${search}`)
    .then(({ data }) => (occupations.value = data.occupations))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false))
}, 500)

const validForm = computed(() => {
  return occupationInterest.value.occupation_id
})

onMounted(() => {
  initOccupationInterest()
})
</script>
