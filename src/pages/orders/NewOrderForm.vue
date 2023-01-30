<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Aquisição de Créditos</h4>
              <div class="h-100 p-4 overflow-overlay page-app">
                <div>
                  <div v-if="recipient == 'EMP'">
                    <OrderCompany />
                  </div>

                  <div v-if="recipient == 'CAN'">
                    <OrderCandidate />
                  </div>
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
import { ref, reactive, onMounted } from "vue";
import axios from "@/api/axios";
// import { useRouter } from 'vue-router'
import { useOrderStore } from "@/stores/orderStore";
import ShowErrors from "@/components/global/ShowErrors.vue";
import OrderCompany from "@/components/orders/OrderCompany.vue";
import OrderCandidate from "@/components/orders/OrderCompany.vue";

const recipient = ref("EMP");

const hasError = ref(false);
let errorMessages = reactive([]);
// const isSubmitting = ref(false)

const store = useOrderStore();
// const router = useRouter()

// const save = async () => {
//   if (hasErrorForm()) {
//     return
//   }

//   const { data } = await axios.post('/orders', { orders: store.data })

//   if (!data.error) {
//     form.editing = false
//     router.go(-1)
//   } else {
//     hasError.value = true
//     errorMessages.value = data.message
//     isSubmitting.value = false
//     form.editing = true
//   }
// }

// const hasErrorForm = () => {
//   errorMessages.value = store.hasErrorForm()

//   if (errorMessages.value.length) {
//     hasError.value = true
//     return true
//   }

//   return false
// }

onMounted(async () => {
  await axios.get("/plans/available").then(({ data }) => {
    store.plansBaseCurriculum = data.plansBaseCurriculum;
    store.plansAdvertising = data.plansAdvertising;
    recipient.value = data.recipient;
  });
});
</script>
