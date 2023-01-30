import axios from '@/api/axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    profile: null,
  }),

  actions: {
    isLogged() {
      return !!this.user
    },

    async logout() {
      const { data } = await axios.get('/logout').then(() => {
        
      })
      if (data.error) throw data.error
    },
  },
})
