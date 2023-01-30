<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Cadastro de Vagas</h4>
              <div>
                <div class="col-12 mb-3">
                  <label for="title" class="form-label">Título da Vaga</label>
                  <input
                    id="title"
                    v-model="store.data.jobOffer.title"
                    type="text"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="row col-12 mb-3">
                  <label class="form-label" for="occupation_id">Cargo</label>
                  <v-select
                    id="occupation_id"
                    v-model="store.data.jobOffer.occupation"
                    class="style-chooser"
                    label="name"
                    :reduce="(option) => option.name"
                    :options="occupations"
                    :filterable="false"
                    :disabled="!form.editing"
                    @search="getOccupations"
                    @option:selected="(option) => (store.data.jobOffer.occupation_id = option.id)"
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

                <div class="row col-6 mb-3">
                  <label class="form-label" for="city_id">Município</label>
                  <v-select
                    id="city_id"
                    v-model="store.data.jobOffer.city"
                    class="style-chooser"
                    label="name"
                    :reduce="(option) => option.name"
                    :options="cities"
                    :filterable="false"
                    :disabled="!form.editing"
                    @search="getCities"
                    @option:selected="(option) => (store.data.jobOffer.city_id = option.id)"
                    @search:focus="getCities()"
                  >
                    <template #option="{ name, initials }">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column">
                          <span>{{ name }}</span>
                          <span>{{ initials }}</span>
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

                <div class="row col-6 mb-3">
                  <label class="form-label" for="requester_id">Solicitante</label>
                  <v-select
                    id="requester_id"
                    v-model="store.data.jobOffer.requester"
                    class="style-chooser"
                    label="name"
                    :reduce="(option) => option.name"
                    :options="requesters"
                    :filterable="false"
                    :disabled="!form.editing"
                    @search="getRequesters"
                    @option:selected="(option) => (store.data.jobOffer.requester_id = option.id)"
                    @search:focus="getRequester()"
                  >
                    <template #option="{ name, short_name }">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column">
                          <span>{{ name }}</span>
                          <span>{{ short_name }}</span>
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

                <div class="col-3 mb-3">
                  <label for="quantity_offer" class="form-label">Quantidade de vagas</label>
                  <input
                    id="quantity_offer"
                    v-model="store.data.jobOffer.quantity_offer"
                    v-mask="'##'"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="mb-3">
                  <input
                    id="job"
                    v-model="store.data.jobOffer.type_job_id"
                    type="radio"
                    value="EM"
                    :disabled="!form.editing"
                  />
                  <label for="job" class="px-1 me-3">Emprego</label>

                  <input
                    id="Internship"
                    v-model="store.data.jobOffer.type_job_id"
                    type="radio"
                    value="ES"
                    :disabled="!form.editing"
                  />
                  <label for="Internship" class="px-1">Estágio</label>

                  <input
                    id="JobOrInternship"
                    v-model="store.data.jobOffer.type_job_id"
                    type="radio"
                    value="EE"
                    :disabled="!form.editing"
                  />
                  <label for="JobOrInternship" class="px-1">Emprego ou Estágio</label>
                </div>

                <div class="mb-3">
                  <input
                    id="young_apprentice"
                    v-model="store.data.jobOffer.young_apprentice"
                    class="form-check-input"
                    type="checkbox"
                    true-value="true"
                    false-value="false"
                    :disabled="!form.editing"
                  />
                  <label for="young_apprentice" class="form-check-label px-2">Jovem Aprendiz</label>
                </div>

                <div class="mb-3">
                  <input
                    id="disabled_person"
                    v-model="store.data.jobOffer.disabled_person"
                    class="form-check-input"
                    type="checkbox"
                    true-value="true"
                    false-value="false"
                    :disabled="!form.editing"
                  />
                  <label for="disabled_person" class="form-check-label px-2">Vaga para PcD</label>
                </div>

                <div class="col-6 mb-3">
                  <label for="work_schedule" class="form-label">Horário de Trabalho</label>
                  <input
                    id="work_schedule"
                    v-model="store.data.jobOffer.work_schedule"
                    type="text"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-6 mb-3">
                  <label for="educational_level_id" class="form-label">Grau de Escolaridade</label>
                  <select
                    id="store.data.jobOffer.educational_level_id"
                    v-model="store.data.jobOffer.educational_level_id"
                    class="form-select border-gray-500"
                    :disabled="!form.editing"
                  >
                    <option
                      v-for="(option, index) in store.smallSelects.educationalLevels"
                      :key="index"
                      :value="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="remuneration" class="form-label">Remuneração</label>
                  <textarea
                    id="remuneration"
                    v-model="store.data.jobOffer.remuneration"
                    rows="3"
                    cols="80"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Descrição</label>
                  <textarea
                    id="description"
                    v-model="store.data.jobOffer.description"
                    rows="10"
                    cols="80"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="benefits" class="form-label">Benefícios</label>
                  <textarea
                    id="benefits"
                    v-model="store.data.jobOffer.benefits"
                    type="text"
                    rows="10"
                    cols="80"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="activities" class="form-label">Atividades</label>
                  <!-- <mc-wysiwyg v-model="store.data.jobOffer.activities" :hide="hide"></mc-wysiwyg> -->
                  <textarea
                    id="activities"
                    v-model="store.data.jobOffer.activities"
                    rows="10"
                    cols="80"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  ></textarea>
                </div>
              </div>

              <div v-if="form.editing" class="d-flex my-4 justify-content-center w-100">
                <button class="btn btn-outline-gray-800 fs-5 py-1 px-4 border-0 me-2" @click="cancel">Cancelar</button>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  form="register-balanco-form"
                  class="btn btn-warning bg-orange fs-5 py-1 px-4 border-0"
                  @click="save"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="hasError">
    <ShowErrors :errors="errorMessages" @click="hasError = false" />
  </div>
</template>

<script setup>
import _ from "lodash";
import axios from "@/api/axios";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useJobOfferStore } from "@/stores/jobOfferStore";
import { useFormStore } from "@/stores/formStore";
// import { McWysiwyg } from "@mycure/vue-wysiwyg";
import ShowErrors from "@/components/global/ShowErrors.vue";
// import NavigatorForm from "@/components/global/NavigatorForm.vue";

const ENDPOINT = "/job-offers";
const hasError = ref(false);
const isSubmitting = ref(false);
let errorMessages = ref([]);
const occupations = ref([]);
const requesters = ref([]);
const cities = ref([]);

const router = useRouter();
const route = useRoute();
const form = useFormStore();
const store = useJobOfferStore();

const hide = ref({
  strikethrough: true,
  table: false,
});

const cancel = () => {
  switch (form.action) {
    case "insert":
    case "edit":
      router.push({ path: "/admin/vagas" });
      break;

    // case "edit":
    //   getJobOffer(store.data.jobOffer.uuid);
    //   break;

    default:
      break;
  }
  form.editing = false;
};

const edit = () => {
  form.action = "edit";
  form.editing = true;
};

const save = async () => {
  if (hasErrorForm()) {
    return;
  }

  const { data } = await axios.post(ENDPOINT, {
    jobOffer: store.data.jobOffer,
  });

  if (!data.error) {
    form.editing = false;
    router.push({ path: "/admin/vagas" });
  } else {
    errorMessages.value = data.message;
    hasError.value = true;
    isSubmitting.value = false;
    form.editing = true;
  }
};

const hasErrorForm = () => {
  // if (store.data.jobOffer.person_contact === "") {
  //   errorMessages.value.push("Informe o nome da pessoa de contato");
  // }

  // if (store.data.jobOffer.jobOffer.email_billing === "") {
  //   errorMessages.value.push("Informe o email de faturamento");
  // } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(store.data.jobOffer.jobOffer.email_billing)) {
  //   errorMessages.value.push("Informe um email de faturamento válido");
  // }

  // if (store.data.jobOffer.jobOffer.phone === "") {
  //   errorMessages.value.push("Informe o telefone contato");
  // }

  if (errorMessages.value.length) {
    hasError.value = true;
    return true;
  }

  return false;
};

const getJobOffer = async (id) => {
  const data = await axios.get(`/job-offers/${id}`);
  store.data.jobOffer = data.jobOffer;
};

const getOccupations = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/occupations/search/${search}`)
    .then(({ data }) => (occupations.value = data.occupations))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 750);

const getRequesters = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/requesters/search/${search}`)
    .then(({ data }) => (requesters.value = data.requesters))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 750);

const getCities = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/cities/search/${search}`)
    .then(({ data }) => (cities.value = data.cities))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 750);

onMounted(async () => {
  if (!route.params.id) {
    form.action = "insert";
    form.editing = true;
  } else {
    form.action = "edit";
    form.editing = true;
    getJobOffer(route.params.id);
  }

  await axios.get("/job-offers/small-selects").then(({ data }) => {
    store.smallSelects = data;
  });
});

onUnmounted(() => {
  store.editing = false;
  store.$reset();
});
</script>
