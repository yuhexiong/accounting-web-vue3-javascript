import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import TypeMaintain from "../views/TypeMaintain";
import ConsumptionRecord from "../views/ConsumptionRecord.vue";
import MonthlyReport from "../views/MonthlyReport.vue";
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
            name: "TypeMaintain",
            component: TypeMaintain,
          },
          {
            path: "consumption",
            name: "ConsumptionRecord",
            component: ConsumptionRecord,
          },
        ],
      },
      { path: "report", name: "MonthlyReport", component: MonthlyReport },
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
