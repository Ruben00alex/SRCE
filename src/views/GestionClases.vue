<template>
  <div>
    <v-app>
      <v-main>
        <side-bar/>
        <div style="padding: 2rem; margin-left: 50px;">
          <h1 class="title text-uppercase text-start pb-4">
            Gestión de Clases
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
            <div style="position: absolute; right: 0; top: 0; margin: 1rem;">
              <v-fade-transition>
                <v-alert
                  max-width="500px"
                  max-height="300px"
                  v-model="alert"
                  border="start"
                  variant="tonal"
                  closable="true"
                  close-label="Asignatura Agregada"
                  color="grey-darken-3"
                  title="Asignatura Agregada"
                >
                  Se ha agregado la asignatura correctamente a la base de datos.
                </v-alert>
              </v-fade-transition>
            </div>
            <template v-for="course in courses" :key="course.id">
              <v-card
                v-if="hasTeacherFolder(course)"
                color="#181c25"
                rounded="lg"
                class="d-flex flex-column my-6 pa-2 mx-4"
                variant="outlined"
                min-width="400"
                max-width="400"
                min-height="150"
              >

                <v-card-item
                  style="font-weight: bold;"
                  :title="course.name"
                />
                <v-card-text>
                  <div class="text-body-2 text-medium-emphasis text-justify">
                    {{ course.descriptionHeading }}
                  </div>
                </v-card-text>

                <v-card-actions class="align-end">
                  <v-btn
                    class="px-3 mt-5"
                    variant="flat"
                    color="#181c25"
                    content="bottom"
                    @click="agregarCursoBD(course.id, course.name, course.section)"
                  >
                    <v-icon color="white mx-1">mdi-plus</v-icon>
                    <span class="ml-2 text-white me-1">Agregar</span>
                  </v-btn>
                  <v-spacer class="mx-0"/>
                  <v-btn
                    class="px-3 mt-5"
                    variant="tonal"
                    color="#181c25"
                    content="bottom"

                    :href="getTeacherFolder(course)"
                  >
                    <v-icon>mdi-google-drive</v-icon>
                    <span class="ml-2 me-1">Drive</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useAccessStore} from "@/store/access";
import {listCourses, getCourseWork, saveClass} from "@/services/classroomApi";
import SideBar from "@/layouts/default/SideBar.vue";
import AppBar from "@/layouts/default/AppBar.vue";


const router = useRouter();
const accessStore = useAccessStore();
const courses = ref([]);
const alert = ref(false);
const ventanaConfirmar = ref(false);

async function goBack() {
  window.history.length > 1 ? router.go(-1) : await router.push("/");
}

/*Agregar el curso al docente*/

async function agregarCursoBD(id_Asignatura, nombreAsignatura, claveAsignatura) {
  try {
    const response = await saveClass(
      id_Asignatura,
      nombreAsignatura,
      claveAsignatura
    );
    console.log(response);
    alert.value = true;
    window.setInterval(() => {
      alert.value = false;
    }, 3000)
  } catch (error) {
    console.log(error);
  }
}

/*DESPLIEGUE DE CURSO*/
async function fetchCourses() {
  try {
    const response = await listCourses();
    courses.value = response;
    console.log(courses.value);
  } catch (error) {
    console.error("Error listing courses:", error);
  }
}

/*DESPLIEGUE DE TAREAS*/
async function showCourseWork(courseId) {
  const courseWork = await getCourseWork(courseId);
}

const hasTeacherFolder = (course) => {
  return course.courseState === "ACTIVE" && course.teacherFolder;
};

const getTeacherFolder = (course) => {
  return `https://drive.google.com/drive/folders/${course.teacherFolder.id}`;
};

onMounted(async () => {
  ventanaConfirmar.value = false;
  await fetchCourses();
});
</script>
