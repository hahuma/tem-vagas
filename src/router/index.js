import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Admin from "@/pages/Admin.vue";
// import auth from '@/middleware/auth'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    component: import('@/pages/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/admin",
    component: Admin,
    children: [
      { path: "/admin/afiliados", name: "Affiliates", component: () => import("@/pages/affiliates/AffiliateList.vue") },
      {
        path: "/admin/afiliado/:id?",
        name: "Affiliate",
        component: () => import("@/pages/affiliates/AffiliateForm.vue"),
      },

      { path: "/admin/empresas", name: "Companies", component: () => import("@/pages/companies/CompanyList.vue") },
      { path: "/admin/empresa/:id?", name: "Company", component: () => import("@/pages/companies/CompanyForm.vue") },

      //   {
      //     path: '/admin/candidatos',
      //     name: 'Candidates',
      //     component: () => import('@/pages/candidates/CandidateList.vue'),
      //   },
      //   {
      //     path: '/admin/candidato/:id?',
      //     name: 'Candidate',
      //     component: () => import('@/pages/candidates/CandidateForm.vue'),
      //   },

      //   // { path: '/curriculum', name: 'Curriculum', component: () => import('@/pages/curriculum/AcquireCurriculum.vue') },
      //   {
      //     path: '/admin/curriculo/:uuid',
      //     name: 'CurriculoDetail',
      //     component: () => import('@/components/curriculum/PreviewCurriculumCompany.vue'),
      //   },
      {
        path: "/admin/selecao-curriculos",
        name: "BaseCurriculum",
        component: () => import("@/pages/curriculum/SelectionCurriculum.vue"),
      },
      {
        path: "/admin/selecao-candidatos",
        name: "SelectionCurriculum",
        component: () => import("@/pages/curriculum/SelectionCandidatos.vue"),
      },
      {
        path: "/admin/vagas",
        name: "Jobs",
        component: () => import("@/pages/jobs/JobOfferList.vue"),
      },
      {
        path: "/admin/vaga/:id?",
        name: "JobOffer",
        component: () => import("@/pages/jobs/JobOfferForm.vue"),
      },
      //   { path: '/admin/agendamentos', name: 'Schedule', component: () => import('@/pages/schedules/Schedule.vue') },

      { path: "/admin/pedidos", name: "Order", component: () => import("@/pages/orders/NewOrderForm.vue") },
    ],
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(auth)

export default router;
export { router };