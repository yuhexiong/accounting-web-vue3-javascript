import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/allStyle.css";

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(router);

app.mount("#app");
