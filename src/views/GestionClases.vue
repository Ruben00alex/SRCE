<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-btn icon @click="goBack" color="white">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Gestión de clases</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-card
            color="secondary"
            rounded="lg"
            class="mx-auto my-5"
            variant="elevated"
            v-for="course in courses"
          >
            <v-card-item
              :title="course.name"
              :subtitle="course.descriptionHeading"
              @click="showCourseWork(course.id)"
            />

            <v-btn
              @click="agregarCursoBD(course.id, course.name, course.section)"
            >
              Agregar curso
            </v-btn>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAccessStore } from "@/store/access";
import { listCourses, getCourseWork, saveClass } from "@/services/classroomApi";
const router = useRouter();
const accessStore = useAccessStore();
const courses = ref([]);
const loading = ref(true);
const ventanaConfirmar = ref(false);
async function goBack() {
  window.history.length > 1 ? router.go(-1) : await router.push("/");
}

/*Agregar el curso al docente*/

async function agregarCursoBD(
  id_Asignatura,
  nombreAsignatura,
  claveAsignatura
) {
  try {
    const response = await saveClass(
      id_Asignatura,
      nombreAsignatura,
      claveAsignatura
    );
    alert(response.message);
  } catch (error) {
    console.log(error);
  }
}

/*DESPLIEGUE DE CURSO*/
async function fetchCourses() {
  try {
    const response = await listCourses();
    console.log(response);
    courses.value = response;
  } catch (error) {
    console.error("Error listing courses:", error);
  }
}
/*DESPLIEGUE DE TAREAS*/
async function showCourseWork(courseId) {
  const courseWork = await getCourseWork(courseId);

  console.log(courseWork); /*Here*/
}

onMounted(async () => {
  ventanaConfirmar: false;
  await fetchCourses();
});
</script>
