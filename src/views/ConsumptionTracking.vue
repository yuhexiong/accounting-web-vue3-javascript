<template>
  <div>
    <h1>Consumption Tracking</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Type</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consumption in consumptions" :key="consumption.id">
          <td>{{ consumption.id }}</td>
          <td>{{ consumption.date }}</td>
          <td>{{ consumption.status }}</td>
          <td>{{ consumption.typeId }}</td>
          <td>{{ consumption.name }}</td>
          <td>{{ consumption.amount }}</td>
          <td>{{ consumption.note }}</td>
          <td>
            <button @click="editConsumption(consumption)">Edit</button>
            <button @click="deleteConsumption(consumption.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="addOrUpdateConsumption">
      <input v-model="consumption.date" type="text" placeholder="Date" />
      <input v-model="consumption.status" type="text" placeholder="Status" />
      <input v-model="consumption.typeId" type="text" placeholder="Type" />
      <input v-model="consumption.name" type="text" placeholder="Name" />
      <input v-model="consumption.amount" type="text" placeholder="Amount" />
      <input v-model="consumption.note" type="text" placeholder="Note" />
      <button type="submit">Add/Update Consumption</button>
    </form>
  </div>
</template>

<script>
import { axiosInstance } from "../router/index";

export default {
  data() {
    return {
      consumption: {
        id: 0,
        date: "",
        status: 0,
        typeId: "",
        name: "",
        amount: "",
        note: "",
      },
      consumptions: [],
    };
  },
  methods: {
    async fetchConsumptions() {
      try {
        const response = await axiosInstance.get("/consumption");
        this.consumptions = response.data;
      } catch (error) {
        console.error("Error fetching consumptions:", error);
      }
    },
    async addOrUpdateConsumption() {
      try {
        await axiosInstance.post("/consumption", this.consumption);
        this.consumption = {
          id: 0,
          date: "",
          status: 0,
          typeId: "",
          name: "",
          amount: "",
          note: "",
        };
        this.fetchConsumptions(); // Refresh the consumptions list
      } catch (error) {
        console.error("Error adding/updating consumption:", error);
      }
    },
    async editConsumption() {
      try {
        await axiosInstance.patch(
          `/consumption/${this.consumption.id}`,
          this.consumption
        );
        this.consumption = {
          id: 0,
          date: "",
          status: 0,
          typeId: "",
          name: "",
          amount: "",
          note: "",
        };
        this.fetchConsumptions(); // Refresh the consumptions list
      } catch (error) {
        console.error("Error editing consumption:", error);
      }
    },
    async deleteConsumption() {
      try {
        await axiosInstance.delete(`/consumption/${this.consumptionId}`);
        this.consumption = {
          id: 0,
          date: "",
          status: 0,
          typeId: "",
          name: "",
          amount: "",
          note: "",
        };
        this.fetchConsumptions(); // Refresh the consumptions list
      } catch (error) {
        console.error("Error deleting consumption:", error);
      }
    },
  },
  async created() {
    await this.fetchConsumptions();
  },
  async updated() {
    await this.fetchConsumptions();
  },
};
</script>
