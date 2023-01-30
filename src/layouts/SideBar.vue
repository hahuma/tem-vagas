<template>
  <div class="vertical-menu">
    <div data-simplebar class="h-100" style="overflow: auto">
      <div id="sidebar-menu">
        <ul class="metismenu list-unstyled btn-toggle-nav" id="side-menu">
          <li class="menu-title" key="t-menu">Dashboard</li>
          <li v-if="profile == 'ADM'">
            <a
              @click="toggleArrow('dashboards-collapse')"
              class="waves-effect"
              data-bs-toggle="collapse"
              data-bs-target="#dashboards-collapse"
              aria-expanded="false"
            >
              <span class="link text-decoration-none" key="t-dashboards">Cadastros</span>
            </a>
            <div class="collapse show" id="dashboards-collapse" style="">
              <ul class="sub-menu">
                <li><router-link class="link" to="/admin/afiliados"> Afiliados </router-link></li>
                <li><router-link class="link" to="/admin/empresas"> Empresas </router-link></li>
                <li><router-link class="link" to="/admin/candidatos"> Candidatos </router-link></li>
                <li><router-link class="link" to="/admin/planos"> Planos </router-link></li>
                <li><router-link class="link" to="/admin/cargos"> Cargos </router-link></li>
              </ul>
            </div>
          </li>

          <li v-if="profile == 'EMP'">
            <a
              @click="toggleArrow('curriculum-collapse')"
              class="waves-effect"
              data-bs-toggle="collapse"
              data-bs-target="#curriculum-collapse"
              aria-expanded="false"
            >
              <span key="t-curriculum">Base de Currículos</span>
            </a>
            <div class="collapse show" id="curriculum-collapse" style="">
              <ul class="sub-menu">
                <li><router-link class="link" to="/admin/selecao-curriculos">Seleção de Currículos</router-link></li>
                <li><router-link class="link" to="/admin/selecao-candidatos">Seleção de Candidatos</router-link></li>
              </ul>
            </div>
          </li>

          <li v-if="profile == 'EMP'">
            <a
              @click="toggleArrow('dashboards-collapse')"
              class="waves-effect"
              data-bs-toggle="collapse"
              data-bs-target="#dashboards-collapse"
              aria-expanded="false"
            >
              <span key="t-dashboards">Processo Seletivo</span>
            </a>
            <div class="collapse show" id="dashboards-collapse" style="">
              <ul class="sub-menu">
                <li><router-link class="link" to="/admin/vagas"> Cadastro de Vagas </router-link></li>
              </ul>
            </div>
          </li>

          <li v-if="profile == 'EMP'">
            <a
              @click="toggleArrow('finance-collapse')"
              class="waves-effect"
              data-bs-toggle="collapse"
              data-bs-target="#finance-collapse"
              aria-expanded="false"
            >
              <span key="t-finance">Financeiro</span>
            </a>
            <div class="collapse show" id="finance-collapse" style="">
              <ul class="sub-menu">
                <li><router-link class="link" to="/admin/pedidos">Pedido de Créditos</router-link></li>
                <li><router-link class="link" to="/admin/faturas">Faturas não pagas </router-link></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const profile = ref("");
const user = ref("");

const toggleArrow = (id) => {
  document.querySelector(`#${id}`).parentElement.classList.toggle("mm-active");
};

console.log('oi chaouo')

onMounted(() => {
  profile.value = localStorage.getItem("profile");
  user.value = localStorage.getItem("user");
});
</script>
<style scoped>
.link, .menu-title, span {
  font-size: 20px !important;
  text-decoration: none;
}
</style>