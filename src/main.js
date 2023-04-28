import { createApp } from 'vue'
import './styles/main.scss'
import router from './router/router';
import App from './App.vue'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "afex-catalogue.firebaseapp.com",
  projectId: "afex-catalogue",
  storageBucket: "afex-catalogue.appspot.com",
  messagingSenderId: "877056369514",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router)

app.mount('#app')
