<template>
  <v-navigation-drawer
    permanent
    color="white"
    location="left"
    class="h-auto w-auto overflow-hidden"
  >
    <template v-slot:prepend>
      <v-list-item
        lines="three"
        :prepend-avatar="user.profilePicture"
        :title="user.name"
        subtitle="Logged in"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in navDrawerItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        variant="text"
        active-color="#191D26"
        link :to="item.to"
      />
    </v-list>
    <template v-slot:append>
      <div class="pa-8">
        <v-btn
          variant="flat"
          block
          color="#191D26"
          @click="logOut"
        >
          <v-icon left color="white"
                  style="scale: 90%">
            mdi-logout
          </v-icon>
          <v-spacer class="px-1"/>
          <span class="text-uppercase"
                style="color:white; font-size: 0.85rem; "
          >
            Cerrar sesión
          </span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {useAccessStore} from '@/store/access'
import {signOut, getAuth} from 'firebase/auth'
import {ref} from "vue";

const router = useRouter()
const store = useAccessStore()
const auth = getAuth()

const accessStore = useAccessStore();
const user = ref(accessStore.user);

const navDrawerItems = ref([
  {title: "Home", icon: "mdi-home", value:"home", to: "/home"},
  {title: "Evaluación", icon: "mdi-clipboard-check", value:"evaluacion", to: "/evaluacion"},
  {title: "Gestión", icon: "mdi-clipboard-list", value: "gestionAE", to: "/gestionAE"},
  {title: "Clases", icon: "mdi-school", value: "gestionClases", to: "/gestionClases"},
]);

const logOut = () => {
  signOut(auth).then(() => {
    store.$reset()
    router.push({name: 'SignIn'})
  }).catch((error) => {
    console.log(error)
  })
}

</script>
