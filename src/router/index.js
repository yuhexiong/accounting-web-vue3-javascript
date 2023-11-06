import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import TypeManagement from "../views/TypeManagement.vue";
import ConsumptionTracking from "../views/ConsumptionTracking.vue";
import AccountingReport from "../views/AccountingReport.vue";
import LayoutComponent from "@/components/LayoutComponent.vue";
import TypeFetcher from "@/components/TypeFetcher";

const routes = [
  {
    path: "/",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: TypeFetcher,
        children: [
          {
            path: "type",
            name: "TypeManagement",
            component: TypeManagement,
          },
          {
            path: "consumption",
            name: "ConsumptionTracking",
            component: ConsumptionTracking,
          },
        ],
      },
      { path: "report", name: "AccountingReport", component: AccountingReport },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export { axiosInstance };
export default router;
