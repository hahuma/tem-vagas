<template>
  <div>
    <component :is="componentView" />
  </div>
</template>

<script setup>
import { markRaw, onMounted } from 'vue'
// import { useAuthStore } from '@/stores/authStore'

import DashboardAdmin from '@/layouts/dashboards/DashboardAdmin.vue'
// import DashboardAffiliates from '@/layouts/dashboards/DashboardAffiliates.vue'
// import DashboardCompanies from '@/layouts/dashboards/DashboardCompanies.vue'
// import DashboardCandidates from '@/layouts/dashboards/DashboardCandidates.vue'

// const store = useAuthStore()
const componentView = markRaw(DashboardAdmin)

onMounted(() => {
  // switch (store.perfil) {
  //   // case 'candidate':
  //   //   componentView.value = DashboardCandidates
  //   //   break
  //   // case 'affiliate':
  //   //   componentView.value = DashboardAffiliates
  //   //   break
  //   // case 'company':
  //   //   componentView.value = DashboardCompanies
  //   //   break
  //   default:
  //     componentView.value = DashboardAdmin
  //     break
  // }
})
</script>
