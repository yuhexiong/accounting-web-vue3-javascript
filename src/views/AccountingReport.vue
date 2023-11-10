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
      <p></p>

      <div v-if="report">
        <table>
          <thead>
            <tr>
              <th colspan="2">項目</th>
              <th>詳細資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">年份</td>
              <td>{{ report.year }}</td>
            </tr>
            <tr>
              <td colspan="2">月份</td>
              <td>{{ report.month }}</td>
            </tr>
            <template v-if="Object.keys(report.content).length > 0">
              <tr :key="Object.keys(report.content)[0]">
                <td :rowspan="Object.keys(report.content).length">細項</td>
                <td>{{ Object.keys(report.content)[0] }}</td>
                <td>{{ report.content[Object.keys(report.content)[0]] }}</td>
              </tr>
            </template>
            <template
              v-for="(item, index) in Object.entries(report.content)"
              :key="item"
            >
              <tr v-if="index !== 0">
                <td>{{ item[0] }}</td>
                <td>{{ item[1] }}</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">總金額</td>
              <td>{{ report.totalAmount }}</td>
            </tr>
          </tfoot>
        </table>
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
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
          animations: {
            enabled: false,
          },
        },
        colors: ["#006d77", "#83c5be", "#edf6f9", "#ffddd2", "#e29578"],
        labels: [],
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
        this.report = response.data ?? {};
        this.chartOptions = {
          ...this.chartOptions,
          labels: Object.keys(this.report?.content) ?? [],
        };
        this.series = Object.values(this.report?.content) ?? [];
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    },
  },
};
</script>
