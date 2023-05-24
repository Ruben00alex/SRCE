<template>
  <v-app-bar
    color="primary">
    <v-app-bar-title> {{ title }} </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical" color="white"></v-btn>
      <v-btn icon="mdi-logout" color="white" @click="logOut"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAccessStore } from '@/store/access'
import { signOut, getAuth } from 'firebase/auth'

const router = useRouter()
const store = useAccessStore()
const auth = getAuth()

  defineProps({
    title: {
      type: String,
      default: 'Dashboard'
    }
  })

const logOut = () => {
  signOut(auth).then(() => {
    store.$reset()
    router.push({ name: 'Home' })
  }).catch((error) => {
    console.log(error)
  })
}

</script>
