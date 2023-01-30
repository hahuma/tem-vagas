<template>
  <div>
    <div class="row">
      <div v-if="displayTypePerson" class="col-4 mb-3">
        <input
          id="pessoa_juridica"
          v-model="store.data.person.type_person_id"
          type="radio"
          value="J"
          :disabled="!form.editing"
        />
        <label for="pessoa_juridica" class="form-label">Pessoa Jurídica</label>
        <input
          id="pessoa_fisica"
          v-model="store.data.person.type_person_id"
          type="radio"
          value="F"
          :disabled="!form.editing"
        />
        <label for="pessoa_fisica" class="form-label">Pessoa Física</label>
      </div>
    </div>

    <div class="row">
      <div class="col-6 mb-3">
        <label for="document_number" class="form-label">
          {{ store.data.person.type_person_id == "J" ? "CNPJ" : "CPF" }}
        </label>

        <input
          v-if="store.data.person.type_person_id == 'J'"
          id="document_number"
          v-model="store.data.person.document_number"
          v-mask="'##.###.###/####-##'"
          type="text"
          class="form-control border-gray-500"
          :disabled="!form.editing"
        />

        <input
          v-if="store.data.person.type_person_id != 'J'"
          id="document_number"
          v-model="store.data.person.document_number"
          v-mask="'###.###.###-##'"
          type="text"
          class="form-control border-gray-500"
          :disabled="!form.editing"
        />
      </div>
      <div class="col mt-4 fs-6 mb-3">
        <button
          v-if="form.action == 'insert' && form.editing && store.data.person.type_person_id == 'J'"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Obtém cadastro da empresa"
          class="me-1"
          @click="searchCNPJ(store.data.person.document_number)"
        >
          <i class="bi bi-search">Buscar CNPJ </i>
        </button>
      </div>
    </div>

    <div class="col-9 mb-3">
      <label for="name" class="form-label">
        {{ store.data.person.type_person_id == "F" ? "Nome" : "Razão Social" }}
      </label>
      <input
        id="name"
        v-model="store.data.person.name"
        type="text"
        class="form-control border-gray-500"
        :disabled="!form.editing"
      />
    </div>

    <div class="col-6 mb-3">
      <div v-show="store.data.person.type_person_id == 'J'">
        <label for="short_name" class="form-label">Fantasia</label>
        <input
          id="short_name"
          v-model="store.data.person.short_name"
          type="text"
          class="form-control border-gray-500"
          :disabled="!form.editing"
        />
      </div>
    </div>

    <div class="col-9 mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        id="email"
        v-model="store.data.person.email"
        type="email"
        style="text-transform: lowercase"
        class="form-control border-gray-500"
        :disabled="!form.editing"
      />
    </div>

    <div v-if="form.action == 'insert'" class="col-6 mb-3">
      <label for="password" class="form-label">Senha</label>
      <input
        id="password"
        v-model="store.data.user.password"
        type="password"
        style="text-transform: lowercase"
        class="form-control border-gray-500"
      />
    </div>

    <div class="col-3 mb-3">
      <label for="phone" class="form-label">Telefone</label>
      <input
        id="phone"
        v-model="store.data.person.phone"
        v-mask="['(##) ####-####', '(##) #####-####']"
        type="text"
        class="form-control border-gray-500"
        :disabled="!form.editing"
      />
    </div>

    <div v-if="typePerfil == 'candidate'" class="col-3 mb-3">
      <label for="whatsapp" class="form-label">Whatsapp</label>
      <input
        id="whatsapp"
        v-model="store.data.person.whatsapp"
        v-mask="['(##) ####-####', '(##) #####-####']"
        type="text"
        class="form-control border-gray-500"
        :disabled="!form.editing"
      />
    </div>

    <div v-if="typePerfil == 'candidate'" class="col-3 mb-3">
      <label for="instagram" class="form-label">Instagram</label>
      <input
        id="instagram"
        v-model="store.data.person.instagram"
        type="text"
        class="form-control border-gray-500"
        :disabled="!form.editing"
      />
    </div>

    <div v-if="typePerfil == 'candidate'" class="col-3 mb-3">
      <label for="facebook" class="form-label">Facebook</label>
      <input
        id="facebook"
        v-model="store.data.person.facebook"
        type="text"
        class="form-control border-gray-500"
        :disabled="!form.editing"
      />
    </div>
  </div>

  <div>
    <div class="row mt-3 mb-3">
      <div class="col-3">
        <label for="zip" class="form-label">CEP </label>
        <input
          id="zip"
          v-model="store.data.person.zip_code"
          v-mask="'##.###-###'"
          class="form-control border-gray-500"
          type="text"
          :disabled="!form.editing"
        />
      </div>
      <div class="col mt-4 fs-6 mb-3">
        <button
          v-if="form.editing"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Obtém endereço a partir do CEP"
          class="me-1"
          @click="searchZipCode(store.data.person.zip_code)"
        >
          <i class="bi bi-search">Buscar CEP </i>
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-9 mb-3">
        <label for="street" class="form-label">Logradouro </label>
        <input
          id="street"
          v-model="store.data.person.street"
          type="text"
          class="form-control border-gray-500"
          :disabled="!form.editing"
        />
      </div>
      <div class="col-2 mb-3">
        <label for="number" class="form-label">Número </label>
        <input
          id="number"
          v-model="store.data.person.street_number"
          type="text"
          class="form-control border-gray-500"
          :disabled="!form.editing"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-9 mb-3">
        <label for="street_complement" class="form-label">Complemento</label>
        <input
          id="street_complement"
          v-model="store.data.person.street_complement"
          type="text"
          class="form-control border-gray-500"
          :disabled="!form.editing"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-9 mb-3">
        <label for="district" class="form-label">Bairro</label>
        <input
          id="district"
          v-model="store.data.person.district"
          type="text"
          class="form-control border-gray-500"
          :disabled="!form.editing"
        />
      </div>
    </div>

    <div class="row col-6 mb-3">
      <label class="form-label" for="city_id">Município</label>
      <v-select
        id="city_id"
        v-model="store.data.person.city"
        class="style-chooser"
        label="name"
        :reduce="(option) => option.name"
        :options="cities"
        :filterable="false"
        :disabled="!form.editing"
        @search="getCities"
        @option:selected="(option) => (store.data.person.city_id = option.id)"
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

  <div v-if="hasError">
    <ShowErrors :errors="errorMessages" @click="hasError = false" />
  </div>
</template>

<script setup>
import _ from "lodash";
import axios from "@/api/axios";
import { computed, ref } from "vue";
import { usePersonStore } from "@/stores/personStore";
import { useFormStore } from "@/stores/formStore";
import { unmasked } from "@/utils/unmasked";
import ShowErrors from "@/components/global/ShowErrors.vue";

const props = defineProps({
  typePerfil: { required: true, type: String },
  typePerson: { default: "", type: String },
});

let errorMessages = ref("");
const hasError = ref(false);
const cities = ref([]);

const form = useFormStore();
const store = usePersonStore();
store.data.person.type_person_id = ref(props.typePerson);

const displayTypePerson = computed(() => {
  if (form.action === "insert" && props.typePerson === "") {
    if (props.typePerfil !== "candidate" && localStorage.getItem("profile") === "admin") {
      return true;
    }
  }
  return false;
});

const getCities = _.debounce((search, loading) => {
  loading(true);
  axios
    .get(`/cities/${search}`)
    .then(({ data }) => (cities.value = data.cities))
    .catch((error) => console.log(error))
    .finally(() => loading && loading(false));
}, 500);

const searchCNPJ = async (document) => {
  if (document) {
    const cnpj = unmasked(document);
    const { data } = await axios.get(`/cnpj/${cnpj}`);

    if (!data.error) {
      store.data.person.document_number = data.cnpj;
      store.data.person.name = data.razao_social;
      store.data.person.short_name = data.fantasia;
      store.data.person.email = data.email;
      store.data.person.phone = data.telefone;
      streetPerson(data);
    } else {
      errorMessages.value = data.message;
      hasError.value = true;
    }
  }
};

const searchZipCode = async (zipCode) => {
  const { data } = await axios.get(`/zip-code/${zipCode}`);
  if (!data.error) {
    streetPerson(data);
  } else {
    errorMessages.value = data.message;
    hasError.value = true;
  }
};

const streetPerson = (data) => {
  store.data.person.zip_code = data.cep;
  store.data.person.street = data.logradouro;
  store.data.person.street_number = data.numero;
  store.data.person.street_complement = data.complemento_endereco;
  store.data.person.district = data.bairro;
  store.data.person.city_id = data.municipio_id;
};
</script>
