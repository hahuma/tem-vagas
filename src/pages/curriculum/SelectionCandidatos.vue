<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div id="type_selective" class="card-body" v-show="step === 'type_selective'">
              <div class="row">
                <div class="col-4 form-check">
                  <input
                    id="processComplete"
                    v-model="typeSelectiveProcess"
                    type="radio"
                    class="form-check-input"
                    name="selectiveProcess"
                    value="complete"
                    :checked="typeSelectiveProcess == 'complete'"
                  />
                  <label class="form-check-label text-uppercase" for="processComplete"
                    >Processo Seletivo Completo</label
                  >
                </div>

                <div class="col-8 mb-1">
                  <div>
                    <label class="form-label pb-1 fs-6 fw-400" for="job_offer_id">SELECIONE UMA VAGA EM ABERTO</label>
                    <v-select
                      :disabled="typeSelectiveProcess !== 'complete xyz'"
                      id="job_offer_id"
                      class="style-chooser"
                      label="title"
                      :reduce="(option) => option.title"
                      :options="jobs"
                      :clear-search-on-select="true"
                      :filterable="false"
                      :clearable="true"
                      @search="jobs"
                      @option:selected="(option) => (selectiveProcess.job_offer_id = option.id)"
                      @search:focus="jobs"
                    >
                      <template #option="{ title, requester }">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex flex-column">
                            <span>{{ title }}</span>
                            <span>{{ requester }}</span>
                          </div>
                        </div>
                      </template>
                      <template #no-options="{ search, searching }">
                        <template v-if="searching">
                          Não encontrado <em>{{ search }}</em>
                        </template>
                        <em v-else style="opacity: 0.5">Digite as iniciais do título da vaga</em>
                      </template>
                    </v-select>
                  </div>
                  <div>
                    <p>
                      Este tipo de seleção exige o cadastro da vaga previamente. Além disso, os currículos que foram
                      selecionados a partir da base de currículos se juntarão aos que se inscreveram na vaga a partir do
                      anúncios.
                    </p>
                    <p class="bg-primary text-white">AINDA NÃO ESTÁ DISPONÍVEL</p>
                  </div>
                  <hr />
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-4 form-check">
                  <input
                    id="processSimplified"
                    v-model="typeSelectiveProcess"
                    type="radio"
                    class="form-check-input"
                    name="selectiveProcess"
                    value="simplified"
                    :checked="typeSelectiveProcess != 'complete'"
                  />
                  <label class="form-check-label text-uppercase" for="processSimplified"
                    >Processo Seletivo Simplificado</label
                  >
                </div>

                <div class="col-8 mb-1">
                  <div>
                    <label class="form-label pb-1 fs-6 fw-400" for="occupation_id">SELECIONE UM CARGO</label>
                    <v-select
                      :disabled="typeSelectiveProcess !== 'simplified'"
                      id="occupation_id"
                      class="style-chooser"
                      label="name"
                      :reduce="(option) => option.name"
                      :options="occupations"
                      :clear-search-on-select="true"
                      :filterable="false"
                      :clearable="true"
                      @search="getOccupations"
                      @option:selected="(option) => (selectiveProcess.occupation_id = option.id)"
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
                  <div>
                    <p>
                      O tipo de seleção Simplificada é indicado para quem deseja selecionar candidatos de forma rápida,
                      sem ter que cadastrar uma vaga com os requisitos da mesma.
                    </p>
                  </div>
                </div>
              </div>
              <div class="align-content-end">
                <button :disabled="!canToGoSelective" @click="step = 'selective'">AVANÇAR</button>
              </div>
            </div>

            <div v-show="step === 'selective'" class="card-body">
              <div class="row">
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
                    <tr
                      v-for="(item, index) in curriculum"
                      :key="index"
                      :value="item.candidate_uuid"
                      v-show="item.display"
                    >
                      <td>{{ item.candidate }}</td>
                      <td>{{ item.age }}</td>
                      <td>{{ item.score }}</td>
                      <td>{{ item.occupations_interest }}</td>
                      <td>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#scheduled"
                          @click="(itemSelected = item), (indexSelected = index)"
                        >
                          <i class="bi bi-list"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-4">
                <button @click="step = 'type_selective'">VOLTAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="scheduled" class-name="modal-dialog w-150 ms-auto mt-6 me-4 d-flex flex-column">
    <div v-show="stage == 'detail'" id="detail">
      <PreviewCurriculumCompany v-if="Object.keys(itemSelected)" :uuid="itemSelected.candidate_uuid" obf="no" />
    </div>

    <div v-show="stage == 'schedule'" id="schedule">
      <div class="row">
        <div class="col-2">
          <label for="start_date" class="form-label">Data</label>
          <input type="date" id="start_date" class="form-control border-gray-500" v-model="schedule.start_date" />
        </div>

        <div class="col-2">
          <label for="start_hour" class="form-label">Hora</label>
          <input type="time" id="start_hour" class="form-control border-gray-500" v-model="schedule.start_hour" />
        </div>

        <div class="col-5">
          <label for="note" class="form-label">Observação</label>
          <input type="text" id="note" class="form-control border-gray-500" v-model="schedule.note" />
        </div>

        <div class="col-1">
          <button
            class="btn m-0 btn-primary-outline fs-5 py-1 px-4 border-gray-500"
            data-bs-dismiss="modal"
            aria-label="Close"
            aria-hidden="false"
            @click="moveToSelectiveProcess(indexSelected)"
          >
            Agendar
          </button>
        </div>
      </div>

      <table class="table table-sm table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Cargo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in scheduled" :key="index" :value="item.uuid">
            <td>{{ item.candidate }}</td>
            <td>{{ item.start_date }}</td>
            <td>{{ item.start_hour }} - {{ item.end_hour }}</td>
            <td>{{ item.occupation }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="schedule">
      <div class="modal-footer border-0 d-flex justify-content-between align-items-center">
        <button
          class="btn m-0 btn-primary-outline fs-5 py-1 px-4 border-gray-500"
          data-bs-dismiss="modal"
          aria-label="Close"
          aria-hidden="true"
          @click="stage = 'detail'"
        >
          Voltar
        </button>

        <button v-show="stage == 'detail'" @click="stage = 'schedule'">Agendar Entrevista</button>
      </div>
    </div>
  </Modal>

  <div v-if="hasError">
    <ShowErrors :errors="errorMessages" @click="redirect" />
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref, computed, onMounted } from "vue";
import router from "@/router";
import axios from "@/api/axios";
import Modal from "@/components/global/Modal.vue";
import ShowErrors from "@/components/global/ShowErrors.vue";
import PreviewCurriculumCompany from "@/components/curriculum/PreviewCurriculumCompany.vue";

const step = ref("type_selective");
const stage = ref("detail");
const jobs = ref([]);
const scheduled = ref([]);
const curriculum = ref([]);
const itemSelected = ref({});
// const searchInResult = ref('')
const indexSelected = ref(null);
const occupations = ref([]);
const typeSelectiveProcess = ref("simplified");
const hasError = ref(false);
let errorMessages = ref([]);

const schedule = ref({
  start_date: "",
  start_hour: "",
  note: "",
});

const selectiveProcess = ref({
  occupation_id: "",
  job_offer_id: "",
});

const redirect = () => router.push({ path: "/admin" });

const canToGoSelective = computed(() => {
  return (
    ((typeSelectiveProcess.value === "simplified" && selectiveProcess.value.occupation_id) ||
      (typeSelectiveProcess.value === "complete" && selectiveProcess.value.job_offer_id)) &&
    curriculum.value.length
  );
});

const moveToSelectiveProcess = (index) => {
  var payload = JSON.stringify({
    uuid: itemSelected.uuid,
    candidate_uuid: itemSelected.candidate_uuid,
    job_offer_id: selectiveProcess.job_offer_id,
    occupation_id: selectiveProcess.occupation_id,
    schedule: {
      start_date: schedule.start_date,
      start_hour: schedule.start_hour,
      note: schedule.note,
    },
  });

  if (typeSelectiveProcess.value == "complete") {
    const { data } = axios.post("/curriculum/to-job-offer", { data: payload });

    if (data.error) {
      hasError.value = true;
      errorMessages.value = data.message;
    }
  } else {
    const { data } = axios.post("/curriculum/to-direct-selection", { data: payload });

    if (data.error) {
      hasError.value = true;
      errorMessages.value = data.message;
    }
  }

  // Remove currículo da lista
  curriculum[index].display = false;
};

const getOccupations = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/occupations/search/${search}`)
    .then(({ data }) => (occupations.value = data.occupations))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 1000);

onMounted(async () => {
  await axios.get("/job-offers/opened").then(({ data }) => {
    jobs.value = data.jobs;
  });

  await axios.get("/schedules/scheduled").then(({ data }) => {
    scheduled.value = data.scheduled;
  });

  await axios.get("/curriculum/available-to-job").then(({ data }) => {
    curriculum.value = data.curriculum;
    hasError.value = data.error;
    errorMessages.value.push(data.message);
  });
});
</script>
