<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div>
        <h3><router-link to="/type">類別維護</router-link></h3>
      </div>
      <div>
        <h3><router-link to="/consumption">消費紀錄</router-link></h3>
      </div>
      <div>
        <h3><router-link to="/report">每月報表</router-link></h3>
      </div>
    </aside>
    <main class="content">
      <router-view :types="types" @refresh="onRefreshTypes"></router-view>
    </main>
  </div>
</template>

<style>
@import "@/assets/layoutStyle.css";
</style>

<script>
import { axiosInstance } from "../router/index";

export default {
  data() {
    return {
      types: [],
    };
  },
  mounted() {
    this.onRefreshTypes();
  },
  methods: {
    async onRefreshTypes() {
      this.types = await this.fetchTypes();
    },
    async fetchTypes() {
      try {
        const response = await axiosInstance.get("/type");
        return response.data;
      } catch (err) {
        console.error("get types error.", err);
        return [];
      }
    },
  },
};
</script>
