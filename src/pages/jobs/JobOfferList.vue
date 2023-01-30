<template>
  <div class="page-content">
    <div class="container-fluid">
      <NavigatorList v-model="search" title="Lista de Vagas" @action="() => router.push('/admin/vaga')" />

      <NoRegisters v-if="jobOffers.length == 0 && !loading" text="Nenhuma vaga encontrada" />

      <div v-else class="h-100 p-4 overflow-overlay page-app">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
          <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-3">
            <CardGlobal v-for="item in jobOffers" :id="item.uuid" :key="item.uuid" @action="showDetails($event)">
              <template #header>
                <span> Cadastro: {{ item.created_date }} as {{ item.created_hour }} </span>
                <span>
                  {{ item.status }}
                </span>
              </template>

              <template #body>
                <CardText>
                  <b>Título da vaga:</b>
                  <p>{{ item.title }}</p>
                </CardText>
                <CardText>
                  <b>Cargo:</b>
                  <p>{{ item.occupation }}</p>
                </CardText>
                <CardText>
                  <div class="row">
                    <div class="col-6">Tipo de contrato: {{ item.type_job }}</div>
                    <div class="col-6">
                      {{ item.disabled_person ?? "PcD" }} {{ young_apprentice ?? "Jovem Aprendriz" }}
                    </div>
                  </div>
                </CardText>
                <CardText>
                  <b>Inscrições:</b>
                  {{ item.quantity_subscriptions }}
                </CardText>
              </template>

              <template #footer>
                <span class="text-gray-500">{{ item.city }}</span>
              </template>
            </CardGlobal>
          </div>
        </div>
      </div>
    </div>
  </div>

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
    <div class="modal-body">
      <div id="advanced-search-form" @submit.prevent="advancedSearch(criteria)">
        <div class="row mb-1">
          <label class="form-label pb-1 fs-6 fw-400" for="city_id">Município</label>
          <v-select
            id="city_id"
            class="style-chooser"
            label="name"
            :reduce="(option) => option.name"
            :options="cities"
            :clear-search-on-select="true"
            :filterable="false"
            :clearable="true"
            @search="getCities"
            @option:selected="(option) => (criteria.city_id = option.id)"
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

  <NextPage v-if="criteria.page_start < pages" @click="showMore" />
</template>

<script setup>
import _ from "lodash";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/api/axios";
import NoRegisters from "@/components/global/NoRegisters.vue";
import NavigatorList from "@/components/global/NavigatorList.vue";
import CardGlobal from "@/components/global/CardGlobal.vue";
import CardText from "@/components/global/CardText.vue";
import NextPage from "@/components/global/NextPage.vue";
import Modal from "@/components/global/Modal.vue";

const router = useRouter();
const search = ref("");
const cities = ref([]);
const loading = ref(true);
const jobOffers = ref([]);
const pages = ref(1);
const records = ref(0);

const criteria = ref({
  city_id: "",
  page_size: 50,
  page_start: 1,
});
const filters = ref({});

watch(search, (search) => {
  if (search) {
    criteria.search = search;
    advancedSearch();
  }
});

const copyFiltersToCriteria = () => {
  criteria.value = filters.value;
};

const advancedSearch = async (nextPage = false) => {
  filters.value = criteria.value;
  loading.value = true;
  const { data } = await axios.get("/job-offers/list", { params: criteria.value });

  if (!data.error) {
    if (nextPage) {
      jobOffers.value.push = data.jobOffers;
    } else {
      jobOffers.value = data.jobOffers;
    }
    records.value = data.records;
    pages.value = data.pages;
  }
  loading.value = false;
};

const showDetails = (id) => {
  router.push({ path: "/admin/vaga/" + id });
};

async function showMore() {
  criteria.value.page_start++;
  advancedSearch(true); // Nova página
}

const getCities = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/cities/${search}`)
    .then(({ data }) => (cities.value = data.cities))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 500);

onMounted(async () => {
  await advancedSearch(false);
});
</script>
