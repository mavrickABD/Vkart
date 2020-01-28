import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

import router from "./router";
import store from "./store";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";

Vue.use(Vuetify, {
  theme: {
    primary: "#2196F3",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
});
axios.defaults.baseURL = "https://vue-http-1999.firebaseio.com/";

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
