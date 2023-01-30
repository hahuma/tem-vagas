<template>
  <div id="curriculum">
    <div class="row mt-3">
      <div>
        <h2>{{ detail.candidate.name }}</h2>
      </div>
    </div>

    <div class="row">
      <div>Sexo: {{ detail.candidate.gender }}</div>
    </div>

    <div class="row">
      <div>Escolaridade: {{ detail.candidate.educational_level }}</div>
    </div>

    <div class="row">
      {{ detail.candidate.foreign_languages }}
    </div>

    <div class="row">
      <div class="col-6">Cidade: {{ detail.candidate.city }}</div>
      <div class="col-6">Email: {{ detail.candidate.email }}</div>
    </div>

    <div class="row">
      <div class="col-6"></div>
      <div class="col-6">Telefone: {{ detail.candidate.phone }}</div>
    </div>

    <div class="row">
      <div class="col-6">Bairro: {{ detail.candidate.district }}</div>
      <div v-if="detail.candidate.whatsapp" class="col-6">Whatsapp: {{ detail.candidate.whatsapp }}</div>
    </div>

    <div v-if="detail.candidate.about" class="row">
      Sobre
      <span>{{ detail.candidate.about }}</span>
    </div>

    <div v-if="detail.experiences" class="row">
      <h6>Experiência Profissional</h6>
      <div v-for="(item, index) in detail.experiences" :key="index">
        <span
          ><b
            >{{ item.company }} {{ item.start_date }} a {{ item.end_date }} {{ item.occupation }} {{ item.type_job }}</b
          ></span
        >
        <div class="mb-2">{{ item.activities }}</div>
      </div>
    </div>
    <div v-if="detail.areasExperiences">
      <span>Experiência nas áreas: {{ detail.areasExperiences.list }}</span>
    </div>

    <div v-if="detail.courses" class="row">
      <h6>Cursos</h6>
      <div v-for="(item, index) in detail.courses" :key="index">
        <span>{{ item.name }} {{ item.institution }} {{ item.conclusion_year }}</span>
      </div>
    </div>
    <div v-if="detail.areasCourses">
      <span>Cursos nas áreas: {{ detail.areasCourses.list }}</span>
    </div>
  </div>
</template>

<script setup>
// import { useRoute } from 'vue-router'
// import axios from '@/api/axios'

// const props = defineProps({
//   uuid: Number
// })

defineProps({
  detail: Object,
})

// // const route = useRoute()
// const candidate = ref({})
// const experiences = ref([])
// const otherExperiences = ref([])
// const formations = ref([])
// const courses = ref([])
// const areasExperiences = ref({})
// const areasCourses = ref({})

// onMounted(async () => {
//   // const { data } = await axios.get('/curriculum/detail', { params: { uuid: props.uuid } })

//   // candidate.value = data.curriculum.candidate
//   // experiences.value = data.curriculum.experiences
//   // otherExperiences.value = data.curriculum.otherExperiences
//   // formations.value = data.curriculum.formations
//   // courses.value = data.curriculum.courses
//   // areasExperiences.value = data.curriculum.areasExperiences
//   // areasCourses.value = data.curriculum.areasCourses
// })
</script>
