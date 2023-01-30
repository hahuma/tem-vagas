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

app
.use(router)
.use(createPinia())
.use(VueTheMask)
// .use(VueWysiwyg);
.use(VueNumberFormat, {
  prefix: "R$ ",
  decimal: ",",
  thousand: ".",
  precision: 2,
  acceptNegative: false,
})
.component("v-select", VSelect)
.mount("#app");
