<template>
  <div class="row">
    <div class="d-flex flex-column border border-2 border-radius p-3 align-items-center justify-content-center w-100">
      <div class="d-flex text-uppercase fw-bold align-items-center justify-content-between pb-2 border-primary w-100">
        <span>Experiência Profissional</span>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <table class="table m-0">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Cargo</th>
              <th>Início</th>
              <th>Término</th>
              <th v-if="!!form.editing">
                <div class="d-flex justify-content-center">Ações</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in store.data.professionalExperiences" :key="index">
              <tr v-if="!item.deleted">
                <td width="40%">{{ item.company }}</td>
                <td width="30%">{{ item.occupation }}</td>
                <td width="10%">{{ item.start_date }}</td>
                <td width="10%">{{ item.end_date }}</td>
                <td v-if="!!form.editing">
                  <div class="d-flex justify-content-center">
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#professional-experience-modal"
                      @click="editProfessionalExperience(item)"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button
                      class="btn btn-danger py-1 px-2"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-deletion-modal"
                      @click="confirmDeletion({ index, title: item.company })"
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
            @click="initProfessionalExperience"
            text="Adicionar Experiência Profissional"
            reference="#professional-experience-modal"
          />
        </div>
      </div>
    </div>
  </div>

  <Modal id="professional-experience-modal" class-name="modal-dialog modal-dialog-centered">
    <div class="modal-header border-0">
      <h2 class="h4 modal-title">Experiência Profissional</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <form id="professional-experience-form" autocomplete="off" @submit.prevent="insertProfessionalExperience">
      <div class="modal-body overflow-visible">
        <div class="row">
          <label class="form-label" for="professional-experience-company">Empresa</label>
          <input
            id="professional-experience-company"
            v-model="professionalExperience.company"
            type="text"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          />
        </div>

        <div class="row">
          <label class="form-label" for="professional-experience-occupation_id">Cargo</label>
          <v-select
            id="professional-experience-occupation_id"
            class="style-chooser"
            label="name"
            v-model="professionalExperience.occupation"
            :reduce="(option) => option.name"
            :options="occupations"
            :clear-search-on-select="true"
            :filterable="false"
            :clearable="true"
            @search="getOccupations"
            @option:selected="(option) => (professionalExperience.occupation_id = option.id)"
            @search:focus="getOccupations()"
          >
            <template #option="{ name, area }">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <span>{{ name }}</span>
                  <span>{{ area }}</span>
                </div>
              </div>
            </template>
            <template #no-options="{ search, searching }">
              <template v-if="searching">
                Não encontrado <em>{{ search }}</em>
              </template>
              <em v-else style="opacity: 0.5">Digite as iniciais do cargo</em>
            </template>
          </v-select>
        </div>

        <div class="row">
          <label class="form-label" for="professional-experience-activities">Atividades</label>
          <textarea
            id="professional-experience-activities"
            v-model="professionalExperience.activities"
            class="form-control border-gray-500"
            :disabled="!form.editing"
          ></textarea>
        </div>

        <div class="row">
          <div>
            <label class="form-label" for="professional-experience-start_date">Data de Entrada</label>
            <input
              id="professional-experience-start_date"
              v-model="professionalExperience.start_date"
              type="date"
              class="form-control border-gray-500"
              :disabled="!form.editing"
            />
          </div>

          <div>
            <label class="form-label" for="professional-experience-end_date">Data de saída</label>
            <input
              id="professional-experience-end_date"
              v-model="professionalExperience.end_date"
              type="date"
              class="form-control border-gray-500"
              :disabled="!form.editing"
            />
          </div>
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
        form="professional-experience-form"
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
      <h4>EXCLUSÃO DE EXPERIÊNCIA PROFISSIONAL</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <div class="modal-body">
      <h4>EMPRESA: {{ toDelete.title }}?</h4>
    </div>
    <div class="modal-footer border-0">
      <button
        class="btn btn-primary-outline fs-5 py-1 px-4 border-gray-500"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
        @click="
          () => {
            toDelete.index = null;
            toDelete.title = '';
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
        @click="deleteProfessionalExperience"
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
import _ from "lodash";
import axios from "@/api/axios";
import { ref, reactive, computed, onMounted } from "vue";
import { useFormStore } from "@/stores/formStore";
import { useCandidateStore } from "@/stores/candidateStore";
import Modal from "@/components/global/Modal.vue";
import ShowErrors from "@/components/global/ShowErrors.vue";
import NewSubRegister from "@/components/global/NewSubRegister.vue";

const hasError = ref(false);
let errorMessages = ref([]);

const form = useFormStore();
const store = useCandidateStore();
const occupations = ref([]);
const professionalExperience = ref({});

const initProfessionalExperience = () => {
  professionalExperience.value.id = null;
  professionalExperience.value.occupation_id = "";
  professionalExperience.value.company = "";
  professionalExperience.value.occupation = "";
  professionalExperience.value.activities = "";
  professionalExperience.value.start_date = "";
  professionalExperience.value.end_date = "";
  professionalExperience.value.deleted = false;
};

const toDelete = reactive({
  index: null,
  title: "",
});

const confirmDeletion = ({ index, title }) => {
  toDelete.index = index;
  toDelete.title = title;
};

const insertProfessionalExperience = () => {
  store.insertProfessionalExperience(professionalExperience.value);
};

const editProfessionalExperience = (item) => {
  professionalExperience.value.id = item.id;
  professionalExperience.value.occupation_id = item.occupation_id;
  professionalExperience.value.company = item.company;
  professionalExperience.value.occupation = item.occupation;
  professionalExperience.value.activities = item.activities;
  professionalExperience.value.start_date = item.start_date;
  professionalExperience.value.end_date = item.end_date;
  professionalExperience.value.deleted = item.deleted;
};

const deleteProfessionalExperience = () => {
  if (toDelete.index !== null) {
    store.removeOfProfessionalExperiences(toDelete.index);
    toDelete.index = null;
  }
};

const getOccupations = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/occupations/search/${search}`)
    .then(({ data }) => (occupations.value = data.occupations))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 500);

const validForm = computed(() => {
  return (
    professionalExperience.value.company &&
    professionalExperience.value.occupation_id &&
    professionalExperience.value.activities &&
    professionalExperience.value.start_date
  );
});

// const hasErrorForm = () => {
//   if (professionalExperience.value.company === '') {
//     errorMessages.value.push('Informe a empresa')
//   }

//   if (professionalExperience.value.occupation_id === '') {
//     errorMessages.value.push('Informe o cargo')
//   }

//   if (professionalExperience.value.activities === '') {
//     errorMessages.value.push('Informe a atividade')
//   }

//   if (professionalExperience.value.start_date === '') {
//     errorMessages.value.push('Informe a data inicial')
//   }

//   if (errorMessages.value.length) {
//     hasError.value = true
//     return true
//   }

//   return false
// }

onMounted(() => {
  initProfessionalExperience();
});
</script>
