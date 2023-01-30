<template>
  <div class="d-flex w-100 header justify-content-between px-7 m-0 py-3 position-fixed z-3 bg-white">
    <div class="logo">
      <a href="/">
        <img src="../../assets/images/logo-top.png" alt="Tem Vagas">
      </a>
    </div>
    <div class="d-none d-lg-flex my-auto">
      <ul class="d-flex list-unstyled me-5 my-auto gap-4">
        <li><a class="link text-secondary" href="">Vagas disponíveis</a></li>
        <li><a class="link text-secondary" href="">Planos</a></li>
        <li><a class="link text-secondary" href="">Benefícios</a></li>
      </ul>
      <button class="py-2 px-3 my-auto bg-primary" @click="router.push({ path: '/login' })">
        <FontAwesomeIcon :icon="faUser"/>
        Login
      </button>
    </div>
  </div>
</template>
<script setup>
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { router } from '@/router/index'

</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0px 0px 16px rgb(0 0 0 / 32%);
}
.link {
  font-weight: 700;
}
</style>