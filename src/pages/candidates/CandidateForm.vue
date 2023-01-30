<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Cadastro de Candidatos</h4>

              <div class="h-100 p-4 overflow-overlay page-app">
                <!-- Formulário principal de Pessoas -->
                <PersonForm type-perfil="candidate" type-person="F" />

                <AcademicFormations />

                <ForeignLanguages />

                <Courses />

                <ProfessionalExperiences />

                <!-- <OtherExperiences /> -->

                <OccupationsInterest />

                <h4>Fale um pouco sobre você</h4>
                <hr />
                <div class="col-12">
                  <textarea
                    id="about"
                    v-model="storeCandidate.data.candidate.about"
                    class="form-control border-gray-500"
                    style="text-transform: lowercase"
                    :disabled="!form.editing"
                  ></textarea>
                </div>

                <div v-if="form.editing" class="d-flex my-4 justify-content-center w-100">
                  <button class="btn btn-outline-gray-800 fs-5 py-1 px-4 border-0 me-2" @click="cancel">
                    Cancelar
                  </button>
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
import { useCandidateStore } from "@/stores/candidateStore";
import { useFormStore } from "@/stores/formStore";
import ShowErrors from "@/components/global/ShowErrors.vue";
import PersonForm from "@/components/people/Person.vue";
import NavigatorForm from "@/components/global/NavigatorForm.vue";
import AcademicFormations from "@/components/candidates/AcademicFormations.vue";
import Courses from "@/components/candidates/Courses.vue";
import ProfessionalExperiences from "@/components/candidates/ProfessionalExperiences.vue";
// import OtherExperiences from '@/components/candidates/OtherExperiences.vue'
import OccupationsInterest from "@/components/candidates/OccupationsInterest.vue";

const ENDPOINT = "/candidates";
const hasError = ref(false);
const isSubmitting = ref(false);
let errorMessages = reactive([]);

const form = useFormStore();
const store = usePersonStore();
const storeCandidate = useCandidateStore();
const route = useRoute();
const router = useRouter();

const cancel = () => {
  switch (form.action) {
    case "insert":
      router.push({ name: "/admin/candidates" });
      break;

    case "edit":
      store.searchByID(store.data.person.uuid);
      break;

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

  storeCandidate.data = {
    ...storeCandidate.data,
    candidate: {
      ...storeCandidate.data.candidate,
    },
  };

  const { data } = await axios.post(ENDPOINT, {
    person: store.data.person,
    user: store.data.user,
    candidate: storeCandidate.data.candidate,
  });

  if (!data.error) {
    form.editing = false;
    router.push({ path: "/admin/candidatos" });
  } else {
    errorMessages = data.message;
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
  errorMessages = store.hasErrorForm();

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
    const data = await store.searchCandidateByID(route.params.id);
    storeCandidate.data.candidate = data.candidate;
    storeCandidate.data.academicFormations = data.academicFormations;
    storeCandidate.data.professionalExperiences = data.professionalExperiences;
    storeCandidate.data.otherExperiences = data.otherExperiences;
    storeCandidate.data.occupationsInterest = data.occupationsInterest;
    storeCandidate.data.courses = data.courses;
    form.action = "edit";
    form.editing = false;
  }

  await axios.get("/candidates/small-selects").then(({ data }) => {
    store.smallSelects = data;
  });
});

onUnmounted(() => {
  store.editing = false;
  store.$reset();
});
</script>
