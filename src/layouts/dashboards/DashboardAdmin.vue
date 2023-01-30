<template>
  <div id="layout-wrapper">
    <NavBar @toggleSidebar="toggleSidebar()" />
    <SideBar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import SideBar from "@/layouts/SideBar.vue";
import NavBar from "@/layouts/NavBar.vue";

function toggleSidebar() {
  document.body.classList.toggle("sidebar-enable");
  document.body.classList.toggle("vertical-collpsed");
  if (screen.width < 992) {
    document.body.classList.remove("vertical-collpsed");
  }
}

function toggleRightSidebar() {
  document.body.classList.toggle("right-bar-enabled");
}

onMounted(() => {
  document.body.setAttribute("data-sidebar", "dark");
  document.body.setAttribute("data-layout-mode", "light");
});
</script>
