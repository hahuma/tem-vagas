<template>
  <div class="page-content">
    <div class="container-fluid">
      <NavigatorList v-model="search" title="Lista de Afiliados" @action="() => router.push('/admin/afiliado')" />

      <NoRegisters v-if="affiliates.length == 0 && !loading" text="Nenhum afiliado encontrado" />

      <div v-else>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
          <div v-for="item in affiliates" :key="item.uuid" class="col">
            <Card :id="item.uuid" :content="fields(item)" @action="showDetails($event)" />
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
          <div id="advanced-search-form">
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
            @click="advancedSearch"
          >
            Pesquisar
          </button>
        </div>
      </Modal>

      <div v-show="criteria.page_start < pages">
        <NextPage @click="showMore" />
      </div>
    </div>
    <!-- container-fluid -->
  </div>
  <!-- End Page-content -->
</template>

<script setup>
import _ from "lodash";
import axios from "@/api/axios";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import Card from "@/components/global/Card.vue";
import NavigatorList from "@/components/global/NavigatorList.vue";
import NoRegisters from "@/components/global/NoRegisters.vue";
import NextPage from "@/components/global/NextPage.vue";
import Modal from "@/components/global/Modal.vue";

const fields = (item) => ({
  header: {
    [item.type_person_id === "J" ? "CNPJ" : "CPF"]: item.document_number,
    status: item.status,
  },
  body: {
    Nome: item.name,
    Apelido: item.short_name,
  },
  footer: {
    Município: item.city,
  },
});

const router = useRouter();
const search = ref("");
const cities = ref([]);
const affiliates = ref([]);
const pages = ref(1);
const records = ref(0);
const loading = ref(false);

const criteria = ref({
  search: "",
  city_id: "",
  page_size: 50,
  page_start: 1,
});
// const filters = reactive({});

const showDetails = (id) => {
  router.push({ path: "/admin/afiliado/" + id });
};

watch(search, (search) => {
  searchText(search);
});

const searchText = _.debounce((search, loading) => {
  criteria.value.search = search;
  advancedSearch(false);
}, 750);

const copyFiltersToCriteria = () => {
  criteria.value = filters.value;
};

const advancedSearch = async (nextPage = false) => {
  filters.value = criteria.value;
  try {
    const { data } = await axios.get("/affiliates/list", { params: criteria.value });

    if (data.affiliates.length) {
      if (nextPage) {
        affiliates.value.push(...data.affiliates);
      } else {
        affiliates.value = data.affiliates;
      }
      records.value = data.records;
      pages.value = data.pages;
    }
  } catch (error) {
    // message.value = 'Erro ao obter os dados do servidor'
  }
};

async function showMore() {
  criteria.value.page_start++
  advancedSearch(true) // Nova página
}

const getCities = _.debounce((search, loading) => {
  if (!search) return;
  axios
    .get(`/cities/${search}`)
    .then(({ data }) => (cities.value = data.cities))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 750);

onMounted(async () => {
  advancedSearch();
});
</script>
