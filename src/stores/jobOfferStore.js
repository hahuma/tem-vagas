import { defineStore } from 'pinia'

export const useJobOfferStore = defineStore('jobOfferStore', {
  state: () => ({
    data: {
      jobOffer: {
        uuid: null,
        occupation_id: '',
        requester_id: '',
        type_job_id: '',
        type_contract_id: '',
        way_working_id: '',
        job_offer_status_id: '',
        educational_level_id: '',
        city_id: '',
        young_apprentice: false,
        disabled_person: false,
        title: '',
        description: '',
        quantity_offer: 1,
        activities: '',
        mandatory_requisites: '',
        desirable_requisites: '',
        work_schedule: '',
        remuneration: '',
        benefits: '',
        note: '',
        tags: '',
        active: false,
      },
    },

    smallSelects: [],
  }),
})
