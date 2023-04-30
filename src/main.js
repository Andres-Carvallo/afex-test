import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/main.scss";
import router from "./router/router";
import App from "./App.vue";
import { initializeApp } from "firebase/app";

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

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount("#app");
