<template>
  <h2>每月報表</h2>
  <div class="container">
    <div class="left-pane">
      <div>
        <label for="yearDropdown">Year:</label>
        <select v-model="year" id="yearDropdown">
          <option
            v-for="option in availableYears"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>

        <label for="monthDropdown">Month:</label>
        <select v-model="month" id="monthDropdown">
          <option
            v-for="option in availableMonths"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>

        <button @click="fetchReport">Search</button>
      </div>

      <div v-if="report">
        <pre>{{ report }}</pre>
      </div>
    </div>
    <div class="right-pane">
      <h1>testest</h1>
      <div id="chart">
        <apexchart
          type="pie"
          width="380"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
@import "@/assets/reportStyle.css";
</style>

<script>
import { axiosInstance } from "../router/index";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      report: null,
      availableYears: [2022, 2023, 2024, 2025],
      availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      // setting for pie chart
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: ["#006d77", "#83c5be", "#edf6f9", "#ffddd2", "#e29578"],
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    async fetchReport() {
      try {
        const response = await axiosInstance.get(
          `/report/${this.year}/${this.month}`
        );
        this.report = await response.data;
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    },
  },
};
</script>
