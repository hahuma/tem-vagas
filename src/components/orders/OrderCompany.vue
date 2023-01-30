<template>
  <div v-show="step == 'plans'">
    <div class="row">
      <div class="col-6">
        <input
          v-model="orderItem.type_plan_id"
          id="base_curriculum"
          name="type_plan_id"
          type="radio"
          value="BC"
          @click="orderItem.plan_id = store.plansBaseCurriculum[0].plan_id"
          checked
        />
        <label for="base_curriculum" class="px-1 me-3 text-uppercase">Acesso a Base de Currículos</label>

        <input v-model="orderItem.type_plan_id" id="advertising" name="type_plan_id" type="radio" value="AN" />
        <label for="advertising" class="px-1 text-uppercase">Anúncios de Vagas</label>
      </div>

      <div class="col-6 text-center">SELECIONE UM PLANO</div>
    </div>

    <div v-show="orderItem.type_plan_id == 'BC'" class="row">
      <div class="col-6">
        <p>Cada crédito permite acesso a 01 currículo por até 60 dias.</p>
      </div>

      <div class="col-6">
        <table class="table table-sm table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Créditos</th>
              <th>Anúncios grátis</th>
              <th class="text-end">Preço Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in store.plansBaseCurriculum" :key="index" :value="item.id">
              <td>
                <input
                  v-model="orderItem.plan_item_id"
                  name="plan_item_id"
                  type="radio"
                  :value="item.id"
                  @click="updateOrderItem(item)"
                />
              </td>
              <td class="text-center">{{ item.quantity_curriculum }}</td>
              <td class="text-center">{{ item.quantity_advertising }}</td>
              <td class="text-end">{{ vueNumberFormat(item.price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-show="orderItem.type_plan_id == 'AN'" class="row">
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
                  :checked="index == 1"
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
          disabled="true"
        />
        <label for="cartao" class="px-1 text-uppercase">Cartão de Crédito</label>
      </div>
    </div>

    <div class="col-6">
      <h2>Resumo da Compra</h2>
      <div v-if="orderItem.type_plan_id == 'BC'" class="row">
        <div>
          <p>Crédito para acesso aos currículos: {{ store.data.item.quantity_curriculum }}</p>

          <p>Anúncios grátis: {{ store.data.item.quantity_advertising }}</p>

          <p>Preço Total: {{ store.data.item.price }}</p>
        </div>
      </div>

      <div v-if="store.data.item.type_plan_id == 'AN'" class="row">
        <div class="col-4">
          <span>Anúncios: {{ store.data.item.quantity_advertising }} </span>
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
  type_plan_id: 'BC',
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
  if (orderItem.value.type_plan_id == 'BC') {
    store.data.item.type_plan_id = plan.type_plan_id
    store.data.item.plan_item_id = plan.id
    store.data.item.quantity_curriculum = plan.quantity_curriculum
    store.data.item.quantity_advertising = plan.quantity_advertising
    store.data.item.price = plan.price
  } else {
    store.data.item.quantity_advertising = plan.quantity_advertising
    store.data.item.price = plan.price
  }
}

const finishOrder = async () => {
  store.data.order.amount_order = store.data.item.price

  const { data } = await axios.post('/orders/company', { order: store.data.order, item: store.data.item })

  if (data.error) {
    hasError.value = true
    errorMessages.value = data.message
  } else {
    // Toast
    router.push({ path: '/admin' })
  }
}
</script>
