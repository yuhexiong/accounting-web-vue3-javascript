<template>
  <div class="views-div">
    <h2 class="title-h2">Monthly Report</h2>
    <div class="container">
      <div class="left-pane">
        <div style="margin-top: 10px">
          <label for="yearDropdown" style="font-size: 20px"><b>Year </b></label>
          <select v-model="year" id="yearDropdown">
            <option
              v-for="option in availableYears"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>

          <label for="monthDropdown" style="margin-left: 5px; font-size: 20px"
            ><b>Month </b></label
          >
          <select v-model="month" id="monthDropdown">
            <option
              v-for="option in availableMonths"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>

          <button @click="fetchReport" style="margin-left: 5px; width: 60px">
            Search
          </button>
        </div>

        <div v-if="report">
          <table style="width: 100%">
            <thead>
              <tr>
                <th colspan="2" style="width: 380px">Item</th>
                <th style="width: 70px" class="info-column">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">Year</td>
                <td class="info-column">
                  {{ report.year }}
                </td>
              </tr>
              <tr>
                <td colspan="2">Month</td>
                <td class="info-column">
                  {{ report.month }}
                </td>
              </tr>
              <template v-if="Object.keys(report.content).length > 0">
                <tr :key="Object.keys(report.content)[0]">
                  <td
                    :rowspan="Object.keys(report.content).length"
                    style="width: 40px"
                  >
                    Consumption
                  </td>
                  <td>
                    {{ Object.keys(report.content)[0] }}
                  </td>
                  <td class="info-column">
                    $ {{ report.content[Object.keys(report.content)[0]] }}
                  </td>
                </tr>
              </template>
              <template
                v-for="(item, index) in Object.entries(report.content)"
                :key="item"
              >
                <tr v-if="index !== 0">
                  <td>{{ item[0] }}</td>
                  <td class="info-column">$ {{ item[1] }}</td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2">Total Amount</td>
                <td class="info-column">$ {{ report.totalAmount }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="right-pane">
        <div id="chart">
          <apexchart
            type="pie"
            width="500"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
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
          width: 500,
          type: "pie",
          animations: {
            enabled: false,
          },
        },
        colors: [
          "#006d77",
          "#83c5be",
          "#edf6f9",
          "#ffddd2",
          "#e29578",
          "#8a5743",
          "#361d13",
          "#050200",
        ],
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
          labels: Object.keys(this.report?.content ?? {}) ?? [],
        };
        this.series = Object.values(this.report?.content ?? {}) ?? [];
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    },
  },
};
</script>
