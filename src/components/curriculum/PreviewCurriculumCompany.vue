<template>
  <div v-show="candidate.name" id="curriculum">
    <div class="row">
      <div class="col-6">Sexo: {{ candidate.gender }}</div>
      <div class="col-6">Email: {{ candidate.email }}</div>
    </div>

    <div class="row">
      <div class="col-6">Escolaridade: {{ candidate.educational_level }}</div>
      <div class="col-6">Telefone: {{ candidate.phone }}</div>
    </div>

    <div v-show="candidate.foreign_languages" class="row">
      <div class="col-6">Idiomas: {{ candidate.foreign_languages }}</div>
      <div v-if="candidate.whatsapp" class="col-6">Whatsapp: {{ candidate.whatsapp }}</div>
    </div>

    <div class="row">
      <div class="col-6">Bairro: {{ candidate.district }}</div>
      <div class="col-6">Cidade: {{ candidate.city }}</div>
    </div>

    <div v-if="candidate.about" class="row">
      Sobre
      <span>{{ candidate.about }}</span>
    </div>

    <div class="mt-3">
      <h5 class="border-bottom border-2">Cargos de interesse</h5>
      <span>{{ candidate.occupations_interest }}</span>
    </div>

    <div v-if="experiences" class="row mt-3">
      <h5 class="mt-0 border-bottom border-2">Experiência profissional</h5>
      <div v-for="(item, index) in experiences" :key="index">
        <li class="text-bold text-uppercase m-0">
          {{ item.start_date }} a {{ item.end_date }} {{ item.occupation }} {{ item.type_job }} - {{ item.company }}
        </li>
        <p class="mb-3 px-4">{{ item.activities }}</p>
      </div>
    </div>
    <div v-if="areasExperiences" class="row mt-3">
      <h5 class="border-bottom border-2">Outras experiências</h5>
      <span>Experiência nas áreas: {{ areasExperiences.list }}</span>
    </div>

    <div v-if="courses" class="row mt-3">
      <h5 class="border-bottom border-2">Cursos</h5>
      <div v-for="(item, index) in courses" :key="index">
        <span>{{ item.title }} {{ item.institution }} {{ item.conclusion_year }}</span>
      </div>
    </div>
    <div v-if="areasCourses">
      <span>Cursos nas áreas: {{ areasCourses.list }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
// import { useRoute } from 'vue-router'
import axios from "@/api/axios";

const props = defineProps({
  uuid: String,
  obf: { String, default: "yes" },
});

// const route = useRoute()
const candidate = ref({});
const experiences = ref([]);
const otherExperiences = ref([]);
const formations = ref([]);
const courses = ref([]);
const areasExperiences = ref({});
const areasCourses = ref({});

const search = async () => {
  const { data } = await axios.get("/curriculum/detail", { params: { uuid: props.uuid, obf: props.obf } });

  candidate.value = data.curriculum.candidate;
  experiences.value = data.curriculum.experiences;
  otherExperiences.value = data.curriculum.otherExperiences;
  formations.value = data.curriculum.formations;
  courses.value = data.curriculum.courses;
  areasExperiences.value = data.curriculum.areasExperiences;
  areasCourses.value = data.curriculum.areasCourses;
};

watch(
  () => props.uuid,
  async () => await search()
);
</script>
