import axios from "axios";
import { useAccessStore } from "@/store/access";

const API_URL = "https://localhost:4001";
const accessStore = useAccessStore();

export const saveClass = async (
  id_Asignatura,
  nombreAsignatura,
  claveAsignatura
) => {
  try {
    const response = await axios.post(`${API_URL}/courses/bdSaveClass`, {
      id_Asignatura: id_Asignatura,
      nombreAsignatura: nombreAsignatura,
      claveAsignatura: claveAsignatura,
      token: accessStore.$state.access_token,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving course:", error);
    throw error;
  }
};

export const buscarDocente = async (nombre, emailBuscado) => {
  try {
    const response = await axios.post(`${API_URL}/courses/buscarDocente`, {
      nombre: nombre,
      emailBuscado: emailBuscado,
    });
    return response.data;
  } catch (error) {
    console.error("Error looking for teacher:", error);
    throw error;
  }
};

export const listCourses = async () => {
  try {
    const response = await axios.post(`${API_URL}/courses`, {
      token: accessStore.$state.access_token,
    });
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseWork = async (courseId) => {
  try {
    const response = await axios.post(`${API_URL}/courses/coursework`, {
      token: accessStore.$state.access_token,
      courseId: courseId,
    });
    return response.data.courseWork;
  } catch (error) {
    console.error("Error fetching course work:", error);
    throw error;
  }
};
