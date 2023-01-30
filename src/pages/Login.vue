<template>
  <router-view />
  <div class="wrapper d-flex flex-column align-items-center justify-content-center vh-100 w-100">
    <div class="mb-5">
      <img src="../assets/images/logo-top.png" alt="">
    </div>
    <div class="border border-gray-600 bg-white rounded-3" style="width: 400px">
      <div class="w-100 p-3">
        <h4 class="m-0 w-100 text-center p-0 titulo--2">Acesso ao Sistema</h4>
      </div>
      <form class="form-signin px-3 pb-4 pt-2" @submit.prevent="login">
        <div class="form-group">
          <label for="email" class="form-label text-black">Email</label>
          <input
            id="login"
            v-model="user.email"
            type="text"
            class="form-control border-0"
            placeholder="Email"
            required
            autofocus
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label text-black"> Senha </label>
          <input
            id="password"
            v-model="user.password"
            type="password"
            class="form-control border-0"
            placeholder="Senha"
            required
          />
        </div>
        <button class="btn w-100 mt-4 mb-0 btn-primary bg-indigo border-0" type="submit" :disabled="isSubmitting">
          Login
        </button>
      </form>
      <div v-if="hasError">
        <ShowErrors :errors="errorMessage" @click="hasError = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '@/api/axios'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { errorMessageList } from '@/utils/errorMessage'
import ShowErrors from '@/components/global/ShowErrors.vue'

const router = useRouter()

const isSubmitting = ref(false)
let errorMessage = reactive([])
const hasError = ref(false)

let user = reactive({
  email: '',
  password: '',
})

const hasErrorForm = (user) => {
  errorMessage = []

  if (user.email === '') {
    errorMessage.push({
      message: 'Informe um login',
    })
  }

  if (user.password === '') {
    errorMessage.push({
      message: 'Informe sua senha de acesso',
    })
  }

  if (errorMessage.length) {
    hasError.value = true
    return true
  }

  errorMessage.value = []
  return false
}

const login = async () => {
  if (hasErrorForm(user)) {
    return
  }

  isSubmitting.value = true
  const { data } = await axios.post('/login', { email: user.email, password: user.password })

  if (data.error) {
    const { errorMessageArray } = errorMessageList(data.message)
    errorMessage = errorMessageArray
    hasError.value = true
    isSubmitting.value = false
  } else {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', data.user)
    localStorage.setItem('profile', data.profile)
    localStorage.setItem('account', data.account)
    router.push({ path: '/admin' })
  }
}

onMounted(() => {
  console.log('LOGIN')
})
</script>
