<!-- Crea un componente que permita iniciar sesión -->
<template>
  <div
    class="auth-wrapper d-flex align-center justify-center pa-4 bg-primary fill-height"
  >
    <VCard
      class="auth-card pa-5 py-7 flex-column justify-center"
      flat
      width="548"
      max-height="760"
      color="accent"
      rounded="15"
    >
      <VCardItem class="flex-fill justify-center pt-16 pb-4">
        <template #prepend>
          <div>
            <MainLogo size="100%" />
          </div>
        </template>
      </VCardItem>

      <VCardText class="justify-space-between flex-wrap justify-center py-2">
        <div class="text-h6 font-weight-semibold mb-1 text-center py-2">
          Bienvenido docente <span class="font-weight-bold"> UABC </span> 👋🏻
        </div>
        <p class="text-body-1 text-justify py-3 mx-6">
          Para acceder al sistema inicie sesión con su cuenta institucional de
          <b>Google</b>
        </p>
      </VCardText>

      <VCardActions class="flex-fill justify-center pt-12 pb-8">
        <VBtn color="tertiary" variant="tonal" @click="signInWithGoogle">
          <template #prepend>
            <VIcon class="mr-2 ms-1">mdi-google</VIcon>
          </template>
          Iniciar sesión
        </VBtn>
      </VCardActions>
    </VCard>
  </div>
</template>

<script setup>
import { buscarDocente } from "@/services/classroomApi";
import { ref, onMounted } from "vue";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import MainLogo from "@/assets/SRCELogo.vue";
import { useAccessStore } from "@/store/access";
import Swal from "sweetalert2";

const router = useRouter();
const auth = getAuth();
const accessStore = useAccessStore();

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope(
    "https://www.googleapis.com/auth/classroom.courses.readonly"
  );
  provider.addScope(
    "https://www.googleapis.com/auth/classroom.coursework.me.readonly"
  );
  provider.addScope(
    "https://www.googleapis.com/auth/classroom.coursework.students.readonly"
  );
  signInWithPopup(auth, provider)
    .then(async (res) => {
      //if ( res.user.email.endsWith('@uabc.edu.mx') ) {
      //userStore.setUserData(res.user)

      /*AGREGAR USUARIO A BD*/
      try {
        buscarDocente(res.user.displayName, res.user.email);
      } catch (error) {
        console.log(error);
      }

      accessStore.$state.access_token = res._tokenResponse.oauthAccessToken;
      await router.push({ name: "Dashboard" }); /*
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes acceso a este sistema',
          footer: 'Si crees que esto es un error, contacta a tu administrador',
          confirmButtonText: 'Ok'
        })
      }*/
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {});
</script>
