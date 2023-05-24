<template>
  <AppBar title="Dashboard" />
  <v-app>
    <v-main>
      <v-container>
        <v-responsive
          class="auth-wrapper d-flex align-center justify-center pa-4 bg-accent fill-height"
        >
          <v-row>
            <v-col sm="4" v-for="item in cardItems" :key="item.title">
              <v-card
                class="mx-auto bg-white rounded-lg py-3 my-3"
                max-width="334"
                max-height="395"
                color="accent2"
                variant="elevated"
              >
                <v-img :src="item.cover" height="194"></v-img>

                <v-card-text>
                  <div class="text-h6 font-weight-semibold mb-1 text-left py-2">
                    {{ item.title.toLocaleUpperCase() }}
                  </div>
                  <div class="text-body-4 text-medium-emphasis text-justify">
                    {{ item.text }}
                  </div>
                </v-card-text>
                <v-card-actions class="d-flex align-start px-4 mb-4">
                  <v-btn
                    class="px-3"
                    variant="text"
                    color="primary"
                    @click="goTo(item.to)"
                  >
                    Ir al modulo
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import AppBar from "@/layouts/default/AppBar.vue";

const router = useRouter();

const cardItems = ref([
  {
    title: "Evaluación de AE",
    text: "Aquí podrás evaluar los atributos de egreso correspondientes a tus clases.",
    to: "/evaluacion",
    cover:
      "https://cdn.pixabay.com/photo/2020/10/01/08/28/smileys-5617876_1280.jpg",
  },
  {
    title: "Gestión de AE",
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
