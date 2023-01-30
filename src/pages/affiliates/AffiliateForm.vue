<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Cadastro de Afiliados</h4>

              <!-- Dados da Pessoa -->
              <PersonForm type-perfil="affiliate" type-person="" />

              <hr />
              <h3>Informações para recebimento de comissões</h3>
              <hr />

              <!-- Dados do Afiliado -->
              <div>
                <div class="col-6">
                  <label for="person_contact" class="form-label">Pessoa de contato</label>
                  <input
                    id="person_contact"
                    v-model="storeAffiliate.data.affiliate.person_contact"
                    type="text"
                    autocomplete="off"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-6">
                  <label for="email_billing" class="form-label">Email</label>
                  <input
                    id="email_billing"
                    v-model="storeAffiliate.data.affiliate.email_billing"
                    type="email"
                    autocomplete="off"
                    class="form-control border-gray-500"
                    style="text-transform: lowercase"
                    :disabled="!form.editing"
                  />
                </div>

                <div class="col-3">
                  <label for="phone_billing" class="form-label">Telefone</label>
                  <input
                    id="phone_billing"
                    v-model="storeAffiliate.data.affiliate.phone_billing"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                    type="text"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div v-if="profile == 'admin'" class="col-6">
                  <label for="note" class="form-label">Observações</label>
                  <input
                    id="note"
                    v-model="storeAffiliate.data.affiliate.note"
                    type="text"
                    class="form-control border-gray-500"
                    :disabled="!form.editing"
                  />
                </div>

                <div v-if="profile == 'admin'" class="col-3">
                  <div class="form-check">
                    <input
                      id="active"
                      v-model="storeAffiliate.data.affiliate.active"
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
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePersonStore } from "@/stores/personStore";
import { useAffiliateStore } from "@/stores/affiliateStore";
import { useFormStore } from "@/stores/formStore";
import ShowErrors from "@/components/global/ShowErrors.vue";
import PersonForm from "@/components/people/Person.vue";
// import NavigatorForm from "@/components/global/NavigatorForm.vue";

const ENDPOINT = "/affiliates";
const profile = ref("");
const hasError = ref(false);
const isSubmitting = ref(false);
let errorMessages = ref([]);

const form = useFormStore();
const store = usePersonStore();
const storeAffiliate = useAffiliateStore();
const route = useRoute();
const router = useRouter();

const cancel = () => {
  switch (form.action) {
    case "insert":
    case "edit":
      router.push({ path: "/admin/afiliados" });
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

  storeAffiliate.data = {
    ...storeAffiliate.data,
    affiliate: {
      ...storeAffiliate.data.affiliate,
      phone_billing: unmasked(storeAffiliate.data.affiliate.phone_billing),
    },
  };

  const { data } = await axios.post(ENDPOINT, {
    person: store.data.person,
    user: store.data.user,
    affiliate: storeAffiliate.data.affiliate,
  });

  if (!data.error) {
    form.editing = false;
    router.push({ path: "/admin/afiliados" });
  } else {
    errorMessages.value = data.message;
    hasError.value = true;
    isSubmitting.value = false;
    form.editing = true;
  }
};

const unmasked = (value) => {
  if (typeof value === "string") {
    return replace(/[^0-9]/g, "").replace(/\D/g, "");
  }
  return value;
};

const hasErrorForm = () => {
  errorMessages.value = store.hasErrorForm();

  // Informações complementares - Afiliados
  if (storeAffiliate.data.affiliate.person_contact === "") {
    errorMessages.value.push("Informe o nome da pessoa de contato");
  }

  if (storeAffiliate.data.affiliate.email_billing === "") {
    errorMessages.value.push("Informe o email de faturamento");
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(storeAffiliate.data.affiliate.email_billing)) {
    errorMessages.value.push("Informe um email de faturamento válido");
  }

  if (storeAffiliate.data.affiliate.phone === "") {
    errorMessages.value.push("Informe o telefone contato");
  }

  if (errorMessages.value.length) {
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
    form.editing = true;
    form.action = "edit";
    const data = await store.searchAffiliateByID(route.params.id);
    storeAffiliate.data.affiliate = data.affiliate;
  }

  await axios.get("/affiliates/small-selects").then(({ data }) => {
    store.miniSelects = data;
  });
  profile.value = localStorage.getItem("profile");
});

onUnmounted(() => {
  store.editing = false;
  store.$reset();
});
</script>
