import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    data: {
      order: {
        uuid: '',
        recepient_id: '',
        person_id: '',
        payment_method_id: 'BOL',
        number_installments: 1,
        coupon_code: '',
        order_date: '',
        due_date: '',
        payment_data: '',
        amount_order: '',
        amount_discount: '',
        id_gateway_payment: '',
        url_billet: '',
        note: '',
      },

      creditCard: {},

      item: {
        type_plan_id: '',
        item_plan_id: '',
        quantity_curriculum: 0,
        quantity_advertising: 0,
        price: 0,
      },
    },
    plansAdvertising: [],
    plansBaseCurriculum: [],
  }),

  actions: {
    setItemPlan(item) {
      this.store.data.items[0] = item
    },

    hasErrorForm() {
      let errorMessages = []

      if (this.data.order.payment_method_id === '') {
        errorMessages.push({
          message: 'Informe a forma de pagamento',
        })
      }

      return errorMessages
    },
  },
})
