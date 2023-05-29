<template>
  <v-app>
    <v-main class="flex-grow-1">
      <SideBar/>
      <div style="padding: 2rem; margin-left: 75px;">
        <h4 class="text-uppercase text-start py-0" style="font-size: 1.2rem;">
          Bienvenido de vuelta al
        </h4>
        <h1 class="title text-uppercase text-start pb-3">
          Sistema de Recolección de <br> Competencias Estudiantiles
        </h1>
        <v-spacer class="mx-auto my-4"></v-spacer>
      </div>
      <v-container>
        <v-sheet
          color="transparent"
          class="d-flex flex-wrap flex-1-0 justify-center justify-lg-center justify-md-center overflow-auto w-auto h-auto"
          height="50vh">
          <v-card
            v-for="item in cardItems" :key="item.title"
            color="#181c25"
            rounded="lg"
            border="true"
            class="d-flex flex-column mx-8 my-10"
            variant="plain"
            min-width="400"
            max-width="400"
            min-height="150"
            @click="goTo(item.to)"
          >
            <v-img
              :src="item.cover" cover

            />

            <v-card-text>
              <h5
                style="font-size: 1.2rem;"
                class="font-weight-semibold mb-1 text-left py-2">
                {{ item.title.toLocaleUpperCase() }}
              </h5>
              <p
                class="text-body-1 text-medium-emphasis text-justify">
                {{ item.text }}
              </p>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import SideBar from "@/layouts/default/SideBar.vue";
import {useAccessStore} from "@/store/access";

const router = useRouter();
const accessStore = useAccessStore();
const user = accessStore.getUserProps;

const cardItems = ref([
  {
    title: "Evaluación de Atributos de Egreso",
    text: "Aquí podrás evaluar los atributos de egreso correspondientes a tus clases.",
    to: "/evaluacion",
    cover:
      "https://cdn.pixabay.com/photo/2020/10/01/08/28/smileys-5617876_1280.jpg",
  },
  {
    title: "Gestión de Atributos de Egreso",
    text: "Aquí podrás vincular los AE con los que estarás trabajando con respecto a tus clases.",
    to: "/gestionAE",
    cover:
      "https://cdn.pixabay.com/photo/2017/08/01/00/38/man-2562325_1280.jpg",
  },
  {
    title: "Gestión de clases",
    text: "Aquí podrás vincular las clases de classroom con el sistema.",
    to: "/gestionClases",
    cover:
      "https://cdn.pixabay.com/photo/2016/01/19/01/42/library-1147815_1280.jpg",
  },
]);

const goTo = (path) => {
  router.push(path);
};
</script>
