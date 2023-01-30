<template>
  <div class="page-content">
    <div class="container-fluid">
      <h2 class="text-uppercase text-letter-spacing-xs my-0 text-primary font-weight-bold">Entrevistas agendadas</h2>

      <div class="row">
        <table class="table table-sm table-striped">
          <thead>
            <tr>
              <th>Data</th>
              <th>Horário</th>
              <th>Candidato</th>
              <th><i class="bi bi-person"></i></th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in scheduling" :key="index" :value="item.uuid">
              <td>{{ item.start_date }}</td>
              <td>{{ item.start_hour }}</td>
              <td>{{ item.candidate }}</td>
              <td><i v-if="item.confirmation_date" class="bi bi-person-check"></i></td>
              <td>
                <button data-bs-toggle="modal" data-bs-target="#edit" @click="selectSchedule(item)">
                  <i class="bi bi-list"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Modal id="edit" class-name="modal-dialog w-100 ms-auto mt-6 me-4 d-flex flex-column">
    <div class="modal-header border-0 pb-0">
      <div class="col-10">
        <h2 class="h4 modal-title">{{ itemSelected.candidate }}</h2>
      </div>
    </div>
    <div class="modal-body">
      <div class="row mb-1">
        <label class="form-label pb-1 fs-6 fw-400" for="start_date">Data da entrevista</label>
        <input
          type="date"
          id="start_date"
          v-model="itemSelected.start_date"
          class="form-control border-gray-500"
          style="text-transform: lowercase"
        />
      </div>

      <div class="row mb-1">
        <label class="form-label pb-1 fs-6 fw-400" for="start_hour">Hora da entrevista</label>
        <input type="time" id="start_hour" v-model="itemSelected.start_our" class="form-control border-gray-500" />
      </div>

      <div class="form-check">
        <input
          id="finish_schedule"
          v-model="itemSelected.finish_schedule"
          class="form-check-input"
          type="checkbox"
          true-value="true"
          false-value="false"
          :disabled="itemSelected.candidate_absent"
        />
        <label class="form-check-label" for="finish_schedule"> Entrevista realizada </label>
      </div>

      <div class="form-check">
        <input
          id="candidate_absent"
          v-model="itemSelected.candidate_absent"
          class="form-check-input"
          type="checkbox"
          true-value="true"
          false-value="false"
          :disabled="itemSelected.finish_schedule"
        />
        <label class="form-check-label" for="candidate_absent"> Candidato faltou </label>
      </div>

      <div v-show="itemSelected.finish_schedule">
        <label>Mover para etapa</label>
        <select id="stage_id" v-model="itemSelected.stage_id" class="form-select border-gray-500">
          <option v-for="(option, index) in smallSelects.stages" :key="index" :value="option.id">
            {{ option.name }}
          </option>
        </select>

        <div class="row mb-1">
          <label class="form-label pb-1 fs-6 fw-400" for="company_note">Observações</label>
          <textarea id="company_note" v-model="itemSelected.company_note" class="form-control border-gray-500">
            itemSelected.company_note</textarea
          >
        </div>
      </div>
    </div>

    <div class="modal-footer border-0">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="true">
        Cancelar
      </button>

      <button
        data-bs-dismiss="modal"
        class="btn w-100 bg-orange fs-4 py-1 px-4 border-0"
        type="button"
        aria-label="Close"
        aria-hidden="true"
        @click="finish()"
      >
        Concluir
      </button>
    </div>
  </Modal>

  <div v-if="hasError">
    <ShowErrors :errors="errorMessages" @click="hasError = false" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "@/api/axios";
import Modal from "@/components/global/Modal.vue";
import ShowErrors from "@/components/global/ShowErrors.vue";

const hasError = ref(false);
let errorMessages = reactive([]);
let scheduling = reactive([]);
let smallSelects = reactive([]);
const itemSelected = reactive({});
// const chatMessage = ref('')

const selectSchedule = (item) => {
  itemSelected.value.uuid = item.uuid;
  itemSelected.value.candidate = item.candidate;
  itemSelected.value.start_date = item.start_date;
  itemSelected.value.start_hour = item.start_hour;
  itemSelected.value.finish_date = item.finish_date;
  itemSelected.value.company_note = item.company_note;
  itemSelected.value.candidate_absent = item.candidate_absent;
  itemSelected.value.finish_schedule = item.finish_schedule;
  itemSelected.value.stage_id = "";
};

// const sendMessage = () => {
//   if (this.chatMessage) {
//     let tab = window.open(
//       `https://api.whatsapp.com/send?phone=${this.whatsapp}&text=${this.chatMessage}. Via TemVagas.`,
//       '_blank'
//     )
//     tab.focus()
//     this.chatMessage = ''
//   }
// }

const finish = () => {
  const { data } = axios.post("/schedules/update", { schedule: itemSelected.value });

  if (data.error) {
    hasError.value = true;
    errorMessages = data.message;
  }
};

// const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
// const day = schedules.date.value
// const dayName = days[day.getDay()]

// const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
// const month = schedules.date.value
// const monthName = months[month.getMonth()]

// const year = schedules.date.getFullYear()

onMounted(async () => {
  await axios.get("/schedules/small-selects").then(({ data }) => {
    smallSelects = data.smallSelects;
  });

  await axios.get("/schedules/list").then(({ data }) => {
    scheduling = data.scheduling;
  });
});
</script>
