import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import TypeManagement from "../views/TypeManagement.vue";
import ConsumptionTracking from "../views/ConsumptionTracking.vue";
import AccountingReport from "../views/AccountingReport.vue";

const routes = [
  { path: "/type", component: TypeManagement },
  { path: "/consumption", component: ConsumptionTracking },
  { path: "/accounting-report/:year/:month", component: AccountingReport },
];

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { axiosInstance };
export default router;
