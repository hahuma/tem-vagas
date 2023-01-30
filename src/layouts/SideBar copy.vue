<template>
  <div class="vertical-menu">
    <div data-simplebar class="h-100" style="overflow: auto">
      <div id="sidebar-menu">
        <ul class="metismenu list-unstyled btn-toggle-nav" id="side-menu">
          <li class="menu-title" key="t-menu">Dashboard</li>
          <li>
            <a
              @click="toggleArrow('dashboards-collapse')"
              class="waves-effect"
              data-bs-toggle="collapse"
              data-bs-target="#dashboards-collapse"
              aria-expanded="false"
            >
              <span key="t-dashboards">Cadastros</span>
            </a>
            <div class="collapse show" id="dashboards-collapse" style="">
              <ul class="sub-menu">
                <li><router-link to="/admin/afiliados"> Afiliados </router-link></li>
                <li><router-link to="/admin/empresas"> Empresas </router-link></li>
                <li><router-link to="/admin/candidatos"> Candidatos </router-link></li>
                <li><router-link to="/admin/planos"> Planos </router-link></li>
                <li><router-link to="/admin/cargos"> Cargos </router-link></li>
                <li><router-link to="/admin/vagas"> Vagas </router-link></li>
              </ul>
            </div>
          </li>

          <li>
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
                <li><router-link to="/admin/base-curriculos">Seleção de Currículos</router-link></li>
                <li><router-link to="/admin/selecao-candidatos">Seleção de Candidatos</router-link></li>
              </ul>
            </div>
          </li>

          <li>
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
                <li><router-link to="/admin/pedidos">Pedidos</router-link></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const toggleArrow = (id) => {
  document.querySelector(`#${id}`).parentElement.classList.toggle("mm-active");
};
</script>
