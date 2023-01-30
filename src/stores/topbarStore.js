import { defineStore } from 'pinia'

export const useTopbarStore = defineStore('topbarStore', {
  state: () => ({
    search: ''
  })
})
