<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo">
        <h2 class="logo-name">記帳系統</h2>
      </div>
      <div style="padding-top: 18px">
        <div class="sidebar-router-div">
          <h3>
            <router-link to="/type"
              ><font-awesome-icon icon="fas fa-folder" /> 類別維護</router-link
            >
          </h3>
        </div>
        <div class="sidebar-router-div">
          <h3>
            <router-link to="/consumption"
              ><font-awesome-icon icon="fas fa-money-bill" />
              消費紀錄</router-link
            >
          </h3>
        </div>
        <div class="sidebar-router-div">
          <h3>
            <router-link to="/report"
              ><font-awesome-icon icon="fas fa-chart-bar" />
              每月報表</router-link
            >
          </h3>
        </div>
      </div>
      <div class="created-info">
        <p>@ 2024-02-09 yuhexiong</p>
      </div>
    </aside>
    <main class="content">
      <nav class="all-nav">
        <p style="padding-left: 50px; font-size: 18px; font-weight: 600">
          {{ breadcrumb }}
        </p>
      </nav>
      <router-view />
    </main>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faMoneyBill,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFolder, faMoneyBill, faChartBar);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      breadcrumb: "",
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.updateBreadcrumb(route);
      },
    },
  },
  methods: {
    updateBreadcrumb(route) {
      const paths = route.path.split("/");
      paths.shift();
      const breadcrumbItems = paths.map((path, index) => {
        const pathSegments = paths.slice(0, index + 1)[0];
        if (pathSegments === "type") {
          return "類別維護";
        } else if (pathSegments === "consumption") {
          return "消費紀錄";
        } else if (pathSegments === "report") {
          return "每月報表";
        } else {
          return "首頁";
        }
      });
      this.breadcrumb = breadcrumbItems.join(" > ");
    },
  },
};
</script>

<style>
@import "@/assets/layoutStyle.css";
</style>
