<template>
  <div v-show="step == 'plans'">
    <div class="row">
      <div class="col-4">
        <p>Cada crédito permite criar 01 anúncio de vaga no site temvagas.net e nos canais parceiros.</p>
      </div>

      <div class="col-8">
        <table class="table table-sm table-striped table-hover table-bordered border-1">
          <thead>
            <tr>
              <th></th>
              <th>Créditos</th>
              <th>Preço Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in store.plansAdvertising" :key="index" :value="item.id">
              <td>
                <input
                  v-model="orderItem.plan_item_id"
                  name="plan_item_id"
                  type="radio"
                  value="item.id"
                  @click="updateOrderItem(item)"
                />
              </td>
              <td>{{ item.quantity_advertising }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <button @click="nextStep">Avançar</button>
    </div>
  </div>

  <div v-show="step == 'payment'" class="row">
    <div class="col-6">
      <h2>Forma de Pagamento</h2>
      <div>
        <input
          v-model="store.data.order.payment_method_id"
          id="boleto"
          name="payment_method_id"
          type="radio"
          value="BOL"
          checked
        />
        <label for="boleto" class="px-1 me-3 text-uppercase">Boleto</label>

        <input
          v-model="store.data.order.payment_method_id"
          id="cartao"
          name="payment_method_id"
          type="radio"
          value="CCR"
        />
        <label for="cartao" class="px-1 text-uppercase">Cartão de Crédito</label>
      </div>
    </div>

    <div class="col-6">
      <h2>Resumo da Compra</h2>
      <div class="row">
        <div class="col-4">
          <span>Periodo: {{ store.data.item.quantity_advertising }} meses </span>
        </div>
        <div class="col-4">
          <span>Preço Total: {{ store.data.item.price }}</span>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button @click="step = 'plans'">Voltar</button>
      <button @click="finishOrder">Concluir Pedido</button>
    </div>
  </div>

  <div v-if="hasError">
    <ShowErrors :errors="errorMessages" @click="hasError = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import ShowErrors from '@/components/global/ShowErrors.vue'
import axios from '@/api/axios'
import router from '@/router'

let errorMessages = ref([])
const hasError = ref(false)
const store = useOrderStore()
const step = ref('plans')

const orderItem = ref({
  type_plan_id: 'CV',
  plan_item_id: '',
})

const nextStep = () => {
  if (orderItem.value.plan_item_id == '') {
    hasError.value = true
    errorMessages.value = []
    errorMessages.value.push('Selecione o plano que deseja adquirir')
  } else {
    step.value = 'payment'
  }
}

const updateOrderItem = (plan) => {
  store.data.item.type_plan_id = plan.type_plan_id
  store.data.item.plan_item_id = plan.id
  store.data.item.periods = plan.periods
  store.data.item.price = plan.price
}

const finishOrder = async () => {
  store.data.order.amount_order = store.data.item.price

  const { data } = await axios.post('/orders/candidate', { order: store.data.order, item: store.data.item })

  if (data.error) {
    hasError.value = true
    errorMessages.value = data.message
  } else {
    // Toast
    router.push({ path: '/' })
  }
}
</script>
