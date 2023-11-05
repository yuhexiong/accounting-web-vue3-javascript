<template>
  <div>
    <h1>Accounting Report</h1>
    <p>Year: {{ year }}</p>
    <p>Month: {{ month }}</p>
    <div>
      <h2>Content:</h2>
      <ul>
        <li v-for="(amount, typeId) in content" :key="typeId">
          {{ typeId }}: {{ amount }}
        </li>
      </ul>
    </div>
    <p>Total Amount: {{ totalAmount }}</p>
  </div>
</template>

<script>
import { axiosInstance } from "../router/index";

export default {
  props: ["year", "month"],
  data() {
    return {
      content: {},
      totalAmount: 0,
    };
  },
  methods: {
    async fetchAccountingReport(year, month) {
      try {
        const response = await axiosInstance.get(`/report/${year}/${month}`);
        this.content = response.data.content;
        this.totalAmount = response.data.totalAmount;
      } catch (error) {
        console.error("Error fetching accounting report:", error);
      }
    },
  },
  created() {
    this.fetchAccountingReport(this.year, this.month);
  },
};
</script>
