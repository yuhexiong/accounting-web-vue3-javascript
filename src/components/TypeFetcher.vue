<template>
  <div>
    <main>
      <router-view :types="types" @refresh="onRefreshTypes"></router-view>
    </main>
  </div>
</template>

<script>
import { axiosInstance } from "../router/index";

export default {
  data() {
    return {
      types: [],
    };
  },
  methods: {
    async onRefreshTypes() {
      try {
        const response = await axiosInstance.get("/type");
        this.types = response.data;
      } catch (err) {
        console.error("Error fetching types.", err);
        this.types = [];
      }
    },
  },
};
</script>
