<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Cadastro de Empresas</h4>

              <!-- Dados da Pessoa -->
              <PersonForm type-perfil="company" type-person="J" />

              <hr />
              <h3>Informações para Recrutamento de Candidatos</h3>
              <hr />

              <div>
                <div class="col-6 mb-3">
                  <label for="person_contact" class="form-label">Pessoa de contato</label>
                  <input
                    id="person_contact"
                    v-model="storeCompany.data.company.person_contact"
                    type="text"
                    autocomplete="off"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-6 mb-3">
                  <label for="email_rh" class="form-label">Email</label>
                  <input
                    id="email_rh"
                    v-model="storeCompany.data.company.email_rh"
                    type="email"
                    autocomplete="off"
                    class="form-control border-gray-500"
                    style="text-transform: lowercase"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-3 mb-3">
                  <label for="phone_rh" class="form-label">Telefone</label>
                  <input
                    id="phone_rh"
                    v-model="storeCompany.data.company.phone_rh"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                    type="text"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-6 mb-3">
                  <div class="form-check">
                    <input
                      id="employment_agency"
                      v-model="storeCompany.data.company.employment_agency"
                      class="form-check-input"
                      type="checkbox"
                      true-value="true"
                      false-value="false"
                      :disabled="!form.editing"
                    />
                    <label class="form-check-label" for="employment_agency"
                      >É uma Agência de Recrutamento e Seleção</label
                    >
                  </div>
                </div>

                <div v-show="storeCompany.data.company.employment_agency" class="col-6 mb-3">
                  <div class="form-check">
                    <input
                      id="charges_registration_fee"
                      v-model="storeCompany.data.company.charges_registration_fee"
                      class="form-check-input"
                      type="checkbox"
                      true-value="true"
                      false-value="false"
                      :disabled="!form.editing"
                    />
                    <label class="form-check-label" for="charges_registration_fee"
                      >Cobra taxa de inscrição do candidato</label
                    >
                  </div>
                </div>

                <hr />
                <h3>Informações para Faturamento</h3>
                <hr />

                <div class="col-6 mb-3">
                  <label for="email_billing" class="form-label">Email</label>
                  <input
                    id="email_billing"
                    v-model="storeCompany.data.company.email_billing"
                    type="email"
                    autocomplete="off"
                    class="form-control border-gray-500"
                    style="text-transform: lowercase"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-3 mb-3">
                  <label for="phone_billing" class="form-label">Telefone</label>
                  <input
                    id="phone_billing"
                    v-model="storeCompany.data.company.phone_billing"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                    type="text"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div v-if="profile == 'admin'" class="col-3 mb-3">
                  <div class="form-check">
                    <input
                      id="prepaid"
                      v-model="storeCompany.data.company.prepaid"
                      class="form-check-input"
                      type="checkbox"
                      true-value="true"
                      :disabled="!form.editing"
                      false-value="false"
                    />
                    <label class="form-check-label" for="prepaid">Pré-Pago</label>
                  </div>
                </div>

                <div v-if="profile == 'admin'" class="col-6 mb-3">
                  <label for="due_day" class="form-label">Dia de vencimento</label>
                  <input
                    id="due_day"
                    v-model="storeCompany.data.company.due_day"
                    v-mask="'##'"
                    type="number"
                    class="form-control border-gray-500"
                    style="text-transform: lowercase"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-6 mb-3">
                  <div class="form-check">
                    <input
                      id="withholding_tax"
                      v-model="storeCompany.data.company.withholding_tax"
                      class="form-check-input"
                      type="checkbox"
                      true-value="true"
                      :disabled="!form.editing"
                      false-value="false"
                    />
                    <label class="form-check-label" for="withholding_tax">ISS Retido pela empresa</label>
                  </div>
                </div>

                <div v-if="profile == 'admin'" class="col-6 mb-3">
                  <label for="note" class="form-label">Observações</label>
                  <input
                    id="note"
                    v-model="storeCompany.data.company.note"
                    type="text"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div v-if="profile == 'admin'" class="col-3 mb-3">
                  <div class="form-check">
                    <input
                      id="active"
                      v-model="storeCompany.data.company.active"
                      class="form-check-input"
                      type="checkbox"
                      true-value="true"
                      :disabled="!form.editing"
                      false-value="false"
                    />
                    <label class="form-check-label" for="active">Ativo</label>
                  </div>
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
import axios from "@/api/axios";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePersonStore } from "@/stores/personStore";
import { useCompanyStore } from "@/stores/companyStore";
import { useFormStore } from "@/stores/formStore";
import ShowErrors from "@/components/global/ShowErrors.vue";
import PersonForm from "@/components/people/Person.vue";
// import NavigatorForm from "@/components/global/NavigatorForm.vue";

const ENDPOINT = "/companies";
const profile = ref("");
const hasError = ref(false);
const isSubmitting = ref(false);
let errorMessages = ref([]);

const form = useFormStore();
const store = usePersonStore();
const storeCompany = useCompanyStore();
const route = useRoute();
const router = useRouter();

const cancel = () => {
  switch (form.action) {
    case "insert":
    case "edit":
      router.push({ path: "/admin/empresas" });
      break;

    // case "edit":
    //   store.searchByID(store.data.person.uuid);
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

  store.data = {
    ...store.data,
    person: {
      ...store.data.person,
      document: unmasked(store.data.person.document),
      zip_code: unmasked(store.data.person.zip_code),
      phone: unmasked(store.data.person.phone),
      whatsapp: unmasked(store.data.person.whatsapp),
    },
  };

  storeCompany.data = {
    ...storeCompany.data,
    company: {
      ...storeCompany.data.company,
      phone_rh: unmasked(storeCompany.data.company.phone_rh),
      phone_billing: unmasked(storeCompany.data.company.phone_billing),
    },
  };

  const { data } = await axios.post(ENDPOINT, {
    person: store.data.person,
    user: store.data.user,
    company: storeCompany.data.company,
  });

  if (!data.error) {
    form.editing = false;
    router.push({ path: "/admin/empresas" });
  } else {
    errorMessages.value = data.message;
    hasError.value = true;
    isSubmitting.value = false;
    form.editing = true;
  }
};

const unmasked = (value) => {
  if (typeof value === "string") {
    return value.replace(/[^0-9]/g, "").replace(/\D/g, "");
  }
  return value;
};

const hasErrorForm = () => {
  errorMessages.value = store.hasErrorForm();

  // Informações complementares - Afiliados
  if (storeCompany.data.company.person_contact_rh === "") {
    errorMessages.value.push("Informe o nome da pessoa de contato");
  }

  if (storeCompany.data.company.email_billing === "") {
    errorMessages.value.push("Informe o email para faturamento");
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(storeCompany.data.company.email_billing)) {
    errorMessages.value.push("Informe um email de faturamento válido");
  }

  if (storeCompany.data.company.billing === "") {
    errorMessages.value.push("Informe o telefone do setor de faturamento");
  }

  if (storeCompany.data.company.email_rh === "") {
    errorMessages.value.push("Informe o email do RH");
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(storeCompany.data.company.email_rh)) {
    errorMessages.value.push("Informe um email do RH válido");
  }

  if (storeCompany.data.company.phone_rh === "") {
    errorMessages.value.push("Informe o telefone do RH");
  }

  if (errorMessages.length) {
    hasError.value = true;
    return true;
  }

  return false;
};

onMounted(async () => {
  if (!route.params.id) {
    form.action = "insert";
    form.editing = true;
  } else {
    form.action = "edit";
    form.editing = true;
    const data = await store.searchCompanyByID(route.params.id);
    storeCompany.data.company = data.company;
  }

  await axios.get("/companies/small-selects").then(({ data }) => {
    store.miniSelects = data;
  });

  profile.value = localStorage.getItem("profile");
});

onUnmounted(() => {
  store.editing = false;
  store.$reset();
});
</script>
