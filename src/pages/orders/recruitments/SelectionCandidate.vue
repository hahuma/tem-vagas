<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Funil de Seleção</h4>
              <div class="row">
                <div>
                  <span>CARGO: {{ jobOffer.occupation }}</span>
                </div>
                <div v-if="jobOffer.requester">
                  <span>SOLICITANTE: {{ jobOffer.requester }}</span>
                </div>
              </div>
              <div class="m-4">
                <ul id="myTab" class="nav nav-tabs">
                  <li class="nav-item">
                    <a href="#tab_triage" class="nav-link active" data-bs-toggle="tab">Triagem</a>
                  </li>
                  <li class="nav-item">
                    <a href="#tab_analysis" class="nav-link" data-bs-toggle="tab">Análise</a>
                  </li>
                  <li class="nav-item">
                    <a href="#tab_interview" class="nav-link" data-bs-toggle="tab">Entrevista</a>
                  </li>
                  <li class="nav-item">
                    <a href="#tab_approved" class="nav-link" data-bs-toggle="tab">Aprovados</a>
                  </li>
                  <li class="nav-item">
                    <a href="#tab_disapproved" class="nav-link" data-bs-toggle="tab">Reprovados</a>
                  </li>
                  <li class="nav-item">
                    <a href="#tab_discarded" class="nav-link" data-bs-toggle="tab">Descartados</a>
                  </li>
                  <li class="nav-item">
                    <a href="#tab_finish" class="nav-link" data-bs-toggle="tab">Encerrar Seleção</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content">
                <div id="tab_triage" class="tab-pane container active">
                  <div class="input-group w-100 fmxw-400">
                    <span
                      for="search"
                      class="bg-gray-100 m-0 d-flex rounded-start justify-content-center align-items-center border border-end-0 ps-2"
                    >
                      <i class="bi bi-search"></i>
                    </span>
                    <input
                      id="search"
                      v-model="criteria.search"
                      type="search"
                      placeholder="Pesquisar"
                      class="form-control-sm col bg-gray-100 border border-start-0 border-end-0 shadow-none fs-6"
                    />

                    <button
                      type="button"
                      class="btn btn-sm p-1 btn-gray-800 m-0"
                      data-bs-toggle="modal"
                      data-bs-target="#advanced-search"
                    >
                      <i class="bi bi-filter m-0 fs-4"></i>
                    </button>
                  </div>

                  <table class="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Escore</th>
                        <th>Cargos de interesse</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in subscriptions" v-show="item.display" :key="item.uuid">
                        <td>{{ item.name }}</td>
                        <td>{{ item.age }}</td>
                        <td>{{ item.score }}</td>
                        <td>{{ item.occupation_interest }}</td>
                        <td>
                          <button @click="router.push({ path: '/curriculum/' + item.uuid })">
                            <i class="bi bi-list"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5">
                          <span>Candidatos: {{ records["TR"] }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div id="tab_selected" class="tab-pane container active">
                  <table class="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Escore</th>
                        <th>Cargos de interesse</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(index, item) in selected" v-show="item.display" :key="item.uuid">
                        <td>{{ item.name }}</td>
                        <td>{{ item.age }}</td>
                        <td>{{ item.score }}</td>
                        <td>{{ item.occupation_interest }}</td>
                        <td>
                          <button @click="openDialogRemoveSelected({ index, name: item.nome })">
                            <i class="bi bi-recycle"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div>
                    <button :disabled="!selected.length" @click="finishSelect = true">Avançar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="show-detail" class-name="modal-dialog w-150 ms-auto mt-6 me-4 d-flex flex-column">
    <Curriculum :uuid="uuid" />

    <div class="modal-footer border-0 d-flex justify-content-between align-items-center">
      <div class="m-0 d-flex align-items-center">
        <button
          class="btn m-0 btn-primary-outline fs-5 py-1 px-4 border-gray-500"
          data-bs-dismiss="modal"
          aria-label="Close"
          aria-hidden="true"
        >
          Voltar
        </button>
        <button
          class="btn m-0 btn-primary-outline fs-5 py-1 px-4 border-gray-500"
          data-bs-dismiss="modal"
          aria-label="Close"
          aria-hidden="false"
          @click="moveToStage(uuid)"
        >
          Mover para a etapa
        </button>
        <select id="nextStageID" v-model="nextStageID" class="form-select border-gray-500">
          <option v-for="(option, index) in stages" :key="index" :value="option.id">
            <span v-if="option.sequence > candidate.sequence_stage_id">{{ option.name }}</span>
          </option>
        </select>
      </div>
    </div>
  </Modal>

  <Modal id="advanced-search" class-name="modal-dialog w-100 ms-auto mt-6 me-4 d-flex flex-column">
    <div class="modal-header border-0 pb-0">
      <h2 class="h4 modal-title">Filtro de busca</h2>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
        @click="copyFiltersToCriteria"
      ></button>
    </div>
    <div>
      <div class="modal-body">
        <div id="advanced-search-form" @submit.prevent="advancedSearch(criteria)">
          <div class="form-check">
            <input
              id="recentlyRegistered"
              v-model="criteria.recentlyRegistered"
              class="form-check-input"
              type="checkbox"
              true-value="true"
              false-value="false"
            />
            <label class="form-check-label" for="recentlyRegistered">
              Buscar apenas os cadastrados após o dia {{ lastDateSearch }}
            </label>
          </div>
        </div>
      </div>

      <div class="col">
        <label for="distante_range_id" class="form-label"> Distância da residência </label>
        <select id="distance_range_id" v-model="criteria.distance_range_id" class="form-select border-gray-500">
          <option v-for="(option, index) in smallSelects.distanceRanges" :key="index" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col">
        <label for="time_experience" class="form-label"> Experiência no cargo </label>
        <select id="time_experience" v-model="criteria.time_experience" class="form-select border-gray-500">
          <option v-for="(option, index) in smallSelects.timesExperience" :key="index" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col">
        <label for="age" class="form-label"> Faixa etária </label>
        <select id="age" v-model="criteria.age" class="form-select border-gray-500">
          <option v-for="(option, index) in smallSelects.ages" :key="index" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col">
        <label for="educational_level_id" class="form-label"> Grau de Escolaridade </label>
        <select id="educational_level_id" v-model="criteria.time_experience" class="form-select border-gray-500">
          <option v-for="(option, index) in smallSelects.educationalLevels" :key="index" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col">
        <label for="type_license_drive_id" class="form-label"> Categoria CNH </label>
        <select id="type_license_drive_id" v-model="criteria.type_license_drive_id" class="form-select border-gray-500">
          <option v-for="(option, index) in smallSelects.typeLicenseDrives" :key="index" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col">
        <label for="type_vehicle_id" class="form-label"> Deve possuir veículo </label>
        <select id="type_vehicle_id" v-model="criteria.type_vehicle_id" class="form-select border-gray-500">
          <option v-for="(option, index) in smallSelects.typeVehicles" :key="index" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="modal-footer border-0">
      <button
        type="submit"
        form="advanced-search-form"
        aria-label="Close"
        aria-hidden="true"
        data-bs-dismiss="modal"
        class="btn w-100 bg-orange fs-4 py-1 px-4 border-0"
        @click="advancedSearch()"
      >
        Pesquisar
      </button>
    </div>
  </Modal>

  <Modal id="ShowFunnelWizard" class-name="modal-dialog w-100 ms-auto mt-6 me-4 d-flex flex-column">
    <ShowFunnelWizard />
  </Modal>

  <div v-if="hasError">
    <ShowErrors :errors="errorMessagess" @click="hasError = false" />
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/api/axios";
import Modal from "@/components/global/Modal.vue";
import Curriculum from "@/components/Curriculum.vue";
import ShowErrors from "@/components/global/ShowErrors.vue";

const router = useRouter();
const records = ref(0);
const hasError = ref(false);
let errorMessages = ref([]);
const candidate = ref({});
const jobOffer = ref({});
const subscriptions = ref([]);
let smallSelects = ref({});

const criteria = ref({
  search: "",
  city_id: "",
  age_group: "",
  searchRegion: false,
  occupation_id: "",
  type_vehicle_id: "",
  distance_range_id: "",
  recentlyRegistered: false,
  educational_level_id: "",
  type_license_drive_id: "",
  page_start: 1,
  page_size: 9999,
});

const filters = JSON.parse(JSON.stringify(criteria));

const advancedSearch = async () => {
  filters = JSON.parse(JSON.stringify(criteria));
  const { data } = await axios.get("/funnels/search", { params: filters.value });

  if (!data.error) {
    subscriptions.value = data.subscriptions;
    records.value = data.records;
  }
};

const moveToStage = async () => {
  const { data } = await axios.get("/funnels/change-stage", { params: {} });
  if (!data.error) {
    error.value = true;
    errorMessages.value = data.message;
  } else {
    // Toast
  }
};

const finishSelection = async () => {
  const { data } = await axios.post("/funnels/finish", { params: { uuid } });

  if (!data.error) {
    error.value = true;
    errorMessages.value = data.message;
  } else {
    // Toast
  }
};

onMounted(async () => {
  if (!route.params.uuid) {
    await axios.get("/selective-process/resume", { params: { uuid } }).then(({ data }) => {
      jobOffer.value = data.job;
    });
  }

  await axios.get("/funnels/small-selects").then(({ data }) => {
    smallSelects.value = data;
  });

  await axios.get("/funnels/setup").then(({ data }) => {
    ShowFunnelWizard.value = data.showFunnelWizard;
  });
});
</script>
