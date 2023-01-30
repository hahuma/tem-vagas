import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Swiper, { Navigation, Pagination } from 'swiper'

Swiper.use([Pagination, Navigation])

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

import "@/assets/css/app.min.css";
import "@/assets/css/icons.min.css";

import './assets/scss/app.scss'

import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueTheMask from "vue-the-mask";
import VueNumberFormat from "vue-number-format";
// import VueWysiwyg from "@mycure/vue-wysiwyg";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueTheMask);
// app.use(VueWysiwyg);
app.use(VueNumberFormat, {
  prefix: "R$ ",
  decimal: ",",
  thousand: ".",
  precision: 2,
  acceptNegative: false,
});
app.component("v-select", VSelect);

app.mount("#app");
