<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-btn icon @click="goBack" color="white">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Gestión de AE</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container class="">
          <v-row>
            <!--AQUI SE INSTANCIAN LOS BOTONES DE LAS CLASES-->
            <v-col sm="2" v-for="boton in botones" :key="boton.clave">
              <v-card>
                <v-card-actions class="">
                  <v-btn @click="cargarArbol(boton.ae)">{{
                    boton.title
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <!--AQUI SE INSTANCIAN LOS VALORES DE LA BD CON RESPECTO AL BOTON SELECCIONADO-->
            <v-col cols="2">
              <v-sheet class="pa-2 ma-2">
                <v-card class="mx-auto pa-2" max-width="300">
                  <v-list v-model:opened="open">
                    <v-list-subheader>Atributos de Egreso</v-list-subheader>
                    <v-col v-for="rama in ramas">
                      <v-card>
                        <v-card-actions>
                          <v-list-item
                            ><v-btn @click="cargarDerecha(rama.aeDescripcion)"
                              >AE #{{ rama.idAE }}</v-btn
                            >

                            <template v-for="hoja in rama.cd">
                              <v-list-item
                                ><v-btn @click="cargarDerecha(hoja[1])">{{
                                  hoja[0]
                                }}</v-btn>

                                <v-list-item
                                  ><v-btn @click="cargarIndicador()"
                                    >Indicador</v-btn
                                  ></v-list-item
                                >
                              </v-list-item>
                            </template>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-list>
                </v-card>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet class="pa-2 ma-2">
                <template v-if="mostrarFormulario">
                  <v-form>
                    <v-text-field
                      v-model="texto"
                      label="Texto"
                      required
                    ></v-text-field>
                    <v-select
                      v-model="opcionSeleccionada"
                      :items="opciones.map((opt) => opt.nombre)"
                      label="Opción"
                      required
                    ></v-select>
                    <!-- Otros campos del formulario si es necesario -->
                    <v-btn @click="enviarFormulario">Enviar</v-btn>
                  </v-form>
                </template>
                <template v-else>{{ contenidoDerecha }} </template></v-sheet
              >
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { onMounted, ref } from "vue";
import {
  getSelectedCourses,
  getTree,
  getCourseWork,
  getTareasCurso,
} from "@/services/classroomApi";

const router = useRouter();
const courses = [];
async function goBack() {
  window.history.length > 1 ? router.go(-1) : await router.push("/");
}

const botones = ref([]);
const ramas = ref([]);
const contenidoDerecha = ref(
  "Seleccione una clase y posterior a ello un elemento de la izquierda."
);

const mostrarFormulario = ref(false);
const texto = ref("");
const opcionSeleccionada = ref(null);
const opciones = ref([]);

async function showCourseWork(courseId) {
  if (opciones.value.length > 0) {
    var i = 0;
    for (i = opciones.value.length; i < opciones.value.length; i++)
      opciones.value.pop();
  } else {
    const courseWork = await getCourseWork(courseId);

    courseWork.forEach((item) => {
      const tarea = {
        idTarea: item.id,
        nombre: item.title,
      };

      opciones.value.push(tarea);
    });
  }
}

async function fetchCourses() {
  try {
    const response = await getSelectedCourses();

    response.forEach((item) => {
      const course = {
        _id: item._id,
        nombre: item.nombre,
        clave: item.clave,
        ae: item.ae,
      };
      courses.push(course);
    });

    courses.forEach((course) => {
      botones.value.push({
        title: course.nombre,
        ae: course.ae,
        clave: course.clave,
      });
    });
  } catch (error) {
    console.error("Error listing courses:", error);
  }
}
async function cargarIndicador() {
  const response = await getTareasCurso();
  mostrarFormulario.value = true;

  showCourseWork(response);
}

function enviarFormulario() {
  // Lógica para enviar el formulario (puedes manejar los datos aquí)
  // Por ejemplo, puedes imprimir el valor del campo de texto y la opción seleccionada
  console.log(texto.value, opcionSeleccionada.value);
}
function cargarDerecha(aeDescripcion) {
  try {
    mostrarFormulario.value = false;

    contenidoDerecha.value = "" + aeDescripcion;
  } catch (error) {
    console.log(error);
  }
}

async function cargarArbol(ae) {
  try {
    if (ramas.value.length > 0) {
      var i = 0;
      for (i = ramas.value.length; i < ramas.value.length; i++)
        ramas.value.pop();
    } else {
      const response = await getTree(ae);
      response.data.forEach((item) => {
        ramas.value.push({
          idAE: item.idAE,
          aeDescripcion: item.aeDescripcion,
          cantCD: item.cd.length,
          cd: item.cd,
          idIndicadores: item.idIndicadores,
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  ventanaConfirmar: false;
  await fetchCourses();
});
</script>
