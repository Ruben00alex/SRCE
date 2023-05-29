<template>
  <div>
    <v-app>
      <v-main>
        <side-bar/>
        <div style="padding: 2rem; margin-left: 50px;">
          <h1 class="title text-uppercase text-start pb-4">
            Evaluación de Atributos de Egreso
          </h1>
          <p class="text-medium-emphasis text-justify">
            En esta sección podrá gestionar las clases que se encuentran en su cuenta de Google Classroom.
          </p>
        </div>
        <v-container>
          <v-sheet
            max-height="980"
            style="scroll-margin-block: 2rem; scroll-behavior: smooth"
            class="d-flex flex-wrap justify-center justify-lg-center justify-md-center overflow-auto w-auto h-auto"
            color="white">

          </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script setup>
import SideBar from "@/layouts/default/SideBar.vue";
</script>
