/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUhWT6bj68JSgWkrTtnfvyfj6OsOB-2Zo",
  authDomain: "srce-790a7.firebaseapp.com",
  projectId: "srce-790a7",
  storageBucket: "srce-790a7.appspot.com",
  messagingSenderId: "405308009612",
  appId: "1:405308009612:web:f1c98565f4d0ce903d1fa9",
  measurementId: "G-1FR0SXXJQM"
};
// Initialize Firebase
initializeApp(firebaseConfig);

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
