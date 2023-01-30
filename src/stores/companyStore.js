import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('companyStore', {
  state: () => ({
    data: {
      company: {
        payment_method_id: '',
        adhesion_term_id: '',
        business_activity_id: '',
        person_contact_rh: '',
        email_rh: '',
        phone_rh: '',
        email_billing: '',
        phone_billing: '',
        prepaid: true,
        disclose_name: false,
        employment_agency: false,
        charges_registration_fee: false,
        withholding_tax: false,
        due_day: '',
        note: '',
        active: true,
      },
    },
  }),
})
