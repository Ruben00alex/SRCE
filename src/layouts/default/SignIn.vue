<template>
  <div class="main_container fade-in">
    <v-spacer class="mx-auto my-5"></v-spacer>
    <h1 class="title text-center text-uppercase">
      Sistema Recolector de <br> Competencias Estudiantiles</h1>
    <v-btn
      class="login_button text-uppercase text-center mx-5"
      style="width: 15vw;"
      color="#191D26"
      variant="flat"
      @click="signInWithGoogle"
    >
      <v-icon left class="mx-auto" color="#EAE0E0">mdi-google</v-icon>
      <v-spacer class="mx-2"/>
      <div class="login_button_text">Iniciar sesión </div>
    </v-btn>
    <div class="logo_container"/>
  </div>
</template>

<script setup>
import { buscarDocente } from "@/services/classroomApi";
import { ref, onMounted } from "vue";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
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

      accessStore.setAccessToken(res._tokenResponse.oauthAccessToken);
      accessStore.setUserProps(res.user.displayName, res.user.photoURL, true);
      await router.push({ name: "Home" }); /*
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

<style scoped lang="css">
.main_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:  100vw;
  background-color: #fffdf6;
  background-image: url("@/assets/floor.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}

.logo_container {
  height: 90vh;
  width:  100vw;
  background-image: url("@/assets/login-vector-img.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  margin-bottom: 3%;
}

.login_button {
  width: 13rem;
  height: 3rem;
  border-radius: 10px;
}

.title {
  font-weight: 900;
  font-size: 2.5rem;
  color: #1E1715;
  margin-bottom: 2%;
}

.login_button_text {
  font-weight: 600;
  font-size: 1rem;
  color: #EAE0E0;
  margin: 5% 2%;
}

/* add fade in transition to all classes in css */

.fade-in {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
</style>
