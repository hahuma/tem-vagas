<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <h4>SELEÇÃO DE CURRÍCULOS</h4>

              <div class="row">
                <div class="col-6 mb-1">
                  <label class="form-label pb-1 fs-6 fw-400" for="occupation_id">Cargo</label>
                  <v-select
                    id="occupation_id"
                    class="style-chooser"
                    label="name"
                    :reduce="(option) => option.name"
                    :options="occupations"
                    :filterable="false"
                    @search="getOccupations"
                    @option:selected="
                      (option) =>
                        dispatchAdvancedSearchOnSelected(option, {
                          stateAttribute: 'occupation_id',
                          optionAttribute: 'id',
                        })
                    "
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
                      <template v-if="!searching">
                        Não encontrado <em>{{ search }}</em>
                      </template>
                      <em v-else style="opacity: 0.5">Digite as iniciais do cargo</em>
                    </template>
                  </v-select>

                  <div>
                    <div class="form-check">
                      <input
                        id="recently_registered"
                        v-model="criteria.recently_registered"
                        class="form-check-input"
                        type="checkbox"
                        true-value="true"
                        false-value="false"
                        :disabled="!criteria.occupation_id || !criteria.city_id"
                        @click="advancedSearch"
                      />
                      <label class="form-check-label" for="recently_registered">
                        Buscar apenas candidatos cadastrados após {{ criteria.last_date_search }}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-6 mb-1">
                  <div>
                    <label class="form-label pb-1 fs-6 fw-400" for="city_id"> Município da vaga </label>
                    <v-select
                      id="city_id"
                      class="style-chooser"
                      label="name"
                      :value="cities"
                      :reduce="(option) => option.name"
                      :options="cities"
                      :filterable="false"
                      @search="getCities"
                      @search:focus="getCities"
                      @option:selected="
                        (option) =>
                          dispatchAdvancedSearchOnSelected(option, {
                            stateAttribute: 'city_id',
                            optionAttribute: 'id',
                          })
                      "
                    >
                      <template #option="{ name, initials }">
                        <div class="row">
                          <div class="col-6">
                            <span>{{ name }}</span>
                          </div>
                          <div class="col-6">
                            <span>{{ initials }}</span>
                          </div>
                        </div>
                      </template>
                      <template #no-options="{ search, searching }">
                        <template v-if="searching">
                          Não encontrado <em>{{ search }}</em>
                        </template>
                        <em v-else style="opacity: 0.5">Digite as iniciais do município</em>
                      </template>
                    </v-select>
                  </div>

                  <div>
                    <div class="form-check">
                      <input
                        id="search_region"
                        v-model="criteria.search_region"
                        class="form-check-input"
                        type="checkbox"
                        true-value="true"
                        false-value="false"
                        :disabled="!criteria.occupation_id || !criteria.city_id"
                        @click="advancedSearch"
                      />
                      <label class="form-check-label" for="search_region">
                        Buscar também currículos próximo ao município
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="my-4">
                <ul id="acquireCurriculum" class="nav nav-tabs">
                  <li
                    :class="[
                      'nav-item p-2 bg-gray-200 cursor-pointer',
                      { 'bg-gray-800 text-white': selectedTab === 'curriculum_founded' },
                    ]"
                    @click="handleWithTabChange('curriculum_founded')"
                  >
                    <a href="#tab_search" class="active" data-bs-toggle="tab">Currículos Encontrados</a>
                  </li>
                  <li
                    :class="[
                      'nav-item p-2 bg-gray-200 cursor-pointer',
                      { 'bg-gray-800 text-white': selectedTab === 'curriculum_selected' },
                    ]"
                    @click="handleWithTabChange('curriculum_selected')"
                  >
                    <a href="#tab_selected" class="" data-bs-toggle="tab">Currículos Selecionados</a>
                  </li>
                  <li class="ms-auto" v-if="selectedTab === 'curriculum_founded'">
                    <button
                      type="button"
                      class="btn-gray-800 m-0"
                      data-bs-toggle="modal"
                      data-bs-target="#advanced-search"
                    >
                      Filtrar
                      <i class="bi bi-filter m-0"></i>
                    </button>
                  </li>
                </ul>
              </div>

              <div class="tab-content">
                <div v-show="selectedTab === 'curriculum_founded'">
                  <table class="table table-sm table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th class="p-1">Nome</th>
                        <th class="p-1">Idade</th>
                        <th class="p-1">Escore</th>
                        <th class="p-1">Cargos de interesse</th>
                        <th class="p-1">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in curriculum" :key="index" :value="item.uuid" v-show="item.display">
                        <!-- <td class="p-0">
                          <input
                            id="recently_registered"
                            v-model="curriculum[index].selected"
                            class="form-check-input"
                            type="checkbox"
                            true-value="true"
                            false-value="false"
                            @click="countToDiscard(item.unavailable)"
                          />
                        </td> -->
                        <td class="p-0">{{ item.short_name }}</td>
                        <td class="p-0">{{ item.age }}</td>
                        <td class="p-0">{{ item.score }}</td>
                        <td class="text-truncate p-0">{{ item.occupations_interest }}</td>
                        <td class="p-0" align="center">
                          <button
                            class="m-0 h-2 w-4 p-0"
                            data-bs-toggle="modal"
                            data-bs-target="#show-detail"
                            @click="(itemSelected = item), (indexSelected = index)"
                          >
                            <i class="bi bi-list"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div v-show="selectedTab === 'curriculum_selected'">
                  <table class="table table-sm table-striped table-hover table-bordered">
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
                      <tr v-for="(item, index) in curriculumSelected" :key="item.uuid">
                        <td>{{ item.name }}</td>
                        <td>{{ item.age }}</td>
                        <td>{{ item.score }}</td>
                        <td class="text-truncate">{{ item.occupations_interest }}</td>
                        <td>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#confirm-remove-selected"
                            @click="openDialogRemoveSelected(item, index)"
                          >
                            <i class="bi bi-recycle"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div>
                    <button :disabled="curriculumSelected.length === 0" @click="finishSelection">Concluir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="show-detail">
    <div class="modal-header row d-flex justify-content-between border-bottom border-2 bg-gray-200 py-2">
      <div class="col-8">
        <h4 class="mb-0 text-bold text-uppercase">{{ itemSelected.name }}</h4>
      </div>

      <div class="col-4 text-end">
        <h4 class="mb-0 text-bold text-uppercase">Score: {{ itemSelected.score }}</h4>
      </div>
    </div>

    <div class="modal-body modal-dialog-scrollable">
      <PreviewCurriculumCompany v-if="Object.keys(itemSelected)" :uuid="itemSelected.uuid" />
    </div>

    <div class="modal-footer row d-flex justify-content-between border-top border-2">
      <div v-if="credits === 0" class="col-12">Para selecionar este currículo é necessário adquirir créditos.</div>

      <div class="w-100 d-flex align-items-center justify-content-between py-1 px-4">
        <button
          class="btn btn-secondary btn-sm m-0 fs-6 border-gray-500 text-uppercase"
          data-bs-dismiss="modal"
          aria-label="Close"
          aria-hidden="true"
        >
          Voltar
        </button>

        <button
          v-if="credits > 0"
          class="btn btn-primary btn-sm m-0 fs-6 border-gray-500 text-uppercase"
          data-bs-dismiss="modal"
          aria-label="Close"
          aria-hidden="false"
          @click="selectCurriculum(itemSelected, indexSelected)"
        >
          Selecionar
        </button>
      </div>
    </div>
  </Modal>

  <Modal id="confirm-remove-selected">
    <div class="modal-header border-0">
      <h4>Deseja retirar este currículo?</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true"></button>
    </div>
    <div class="modal-body">
      <h4>{{ itemSelected.name }}?</h4>
    </div>
    <div class="modal-footer border-0">
      <button
        class="btn btn-primary-outline fs-5 py-1 px-4 border-gray-500"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
        @click="itemSelected = null"
      >
        Não
      </button>
      <button
        type="submit"
        class="btn btn-primary gradient-orange fs-5 py-1 px-4 border-0"
        data-bs-dismiss="modal"
        aria-label="Close"
        aria-hidden="true"
        @click="removeSelected()"
      >
        Sim
      </button>
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
        @click="criteria = filters"
      >
        <!-- @click="copyFiltersToCriteria"> -->
      </button>
    </div>
    <div>
      <!-- <div class="modal-body">
        <div @submit.prevent="advancedSearch(criteria)" id="advanced-search-form">
          <div class="form-check">
            <input class="form-check-input"
              type="checkbox"
              v-model="criteria.recently_registered"
              true-value="true"
              false-value="false"
              id="recently_registered"
            />
            <label
              class="form-check-label"
              for="recently_registered">
              Buscar apenas os cadastrados após o dia {{ criteria.last_date_search }}
            </label>
          </div>
        </div>
      </div> -->

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

  <div v-if="hasError">
    <ShowErrors :errors="errorMessages" @click="hasError = false" />
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref, onMounted } from "vue";
import axios from "@/api/axios";
import router from "@/router";
import Modal from "@/components/global/Modal.vue";
import ShowErrors from "@/components/global/ShowErrors.vue";
import PreviewCurriculumCompany from "@/components/curriculum/PreviewCurriculumCompany.vue";

const cities = ref([]);
const selectedTab = ref("curriculum_founded");
const records = ref(0);
const credits = ref(0);
const countDiscard = ref(0);
const indexSelected = ref(null);
const itemSelected = ref({});
const occupations = ref([]);
const curriculum = ref([]);
let curriculumSelected = ref([]);
let smallSelects = ref({});
let errorMessages = ref([]);
const hasError = ref(false);

const criteria = ref({
  search: "",
  city_id: "",
  age_range: "",
  search_region: false,
  occupation_id: "",
  type_vehicle_id: "",
  last_date_search: "",
  distante_range_id: "",
  recently_registered: false,
  educational_level_id: "",
  type_license_drive_id: "",
  page_size: 9999,
  page_start: 1,
});

const filters = JSON.parse(JSON.stringify(criteria));

const handleWithTabChange = (tab) => {
  selectedTab.value = tab;
};

const dispatchAdvancedSearchOnSelected = async (option, { stateAttribute, optionAttribute }) => {
  criteria.value[stateAttribute] = option[optionAttribute];
  await advancedSearch();
};

const advancedSearch = async () => {
  if (!criteria.value.occupation_id) {
    hasError.value = true;
    errorMessages.value.push("Informe o cargo que pretende pesquisar os currículos");
  }

  if (!criteria.value.city_id) {
    hasError.value = true;
    errorMessages.value.push("Informe o município da vaga");
  }

  filters.value = JSON.parse(JSON.stringify(criteria));
  const { data } = await axios.get("/curriculum/search", {
    params: criteria.value,
    curriculumSelected: curriculumSelected.value,
  });

  if (!data.error) {
    curriculum.value = data.curriculum;
    records.value = data.records;
  }
};

const openDialogRemoveSelected = (itemSelected, index) => {
  itemSelected.value = itemSelected;
  indexSelected.value = index;
};

const selectCurriculum = (item, index) => {
  curriculumSelected.value.push(item);

  // Remover item de curriculum
  curriculum.value[index].display = false;

  // Reordenar curriculumSelected (score, name)
  credits.value--;
};

const countToDiscard = (selected, unavailable) => {
  if (!unavailable) {
    if (selected) {
      countDiscard.value++;
    } else {
      countDiscard.value--;
    }
  }
};

const removeSelected = () => {
  if (indexSelected.value !== null) {
    curriculumSelected.value.splice(indexSelected, 1);

    let index = curriculum.value.findIndex((item) => {
      return item.uuid === itemSelected.uuid;
    });

    // retornar item para lista curriculum e reordenar (score, name)
    if (index >= 0) {
      curriculum.value[index].display = true;
    } else {
      curriculum.value.push(itemSelected);
    }

    // itemSelected.value = null
    // indexSelected.value = null
    credits.value++;
  }
};

const finishSelection = async () => {
  const { data } = await axios.post("/curriculum/store", {
    acquired: curriculumSelected.value,
    occupation_id: criteria.value.occupation_id,
  });

  if (data.error) {
    hasError.value = true;
    errorMessages.value = data.message;
  } else {
    curriculumSelected = {};
    router.push({ path: "/admin" });
  }
};

const getOccupations = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/occupations/search/${search}`)
    .then(({ data }) => (occupations.value = data.occupations))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 1000);

const getCities = _.debounce((search, loading) => {
  if (!search) return;

  axios
    .get(`/cities/${search}`)
    .then(({ data }) => (cities.value = data.cities))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 1000);

onMounted(async () => {
  await axios.get("/curriculum/small-selects").then(({ data }) => {
    smallSelects.value = data;
  });

  const { data } = await axios.get("/companies/setup-search-curriculum");

  criteria.value.last_date_search = data.company.last_date_search;
  criteria.value.city_id = data.company.city_id;
  credits.value = data.company.credits;
  cities.value.push({
    id: data.company.city_id,
    name: data.company.city,
  });
});
</script>
