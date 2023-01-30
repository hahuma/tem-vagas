import { defineStore } from 'pinia'

export const useAffiliateStore = defineStore('affiliateStore', {
  state: () => ({
    data: {
      affiliate: {
        person_contact: '',
        email_billing: '',
        phone_billing: '',
        note: '',
        active: true
      }
    }
  })
})
