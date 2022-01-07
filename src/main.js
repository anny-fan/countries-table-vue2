import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(store).mount("#app");
