<template>
  <div>
    <h1>Type Management</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in types" :key="type.id">
          <td>{{ type.id }}</td>
          <td>{{ type.name }}</td>
          <td>
            <button @click="editType(type)">Edit</button>
            <button @click="deleteType(type.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="insert">
      <input v-model="type.id" type="text" />
      <input v-model="type.name" type="text" />
      <button type="button">add type</button>
    </form>
  </div>
</template>

<script>
import { axiosInstance } from "../router/index";

export default {
  data() {
    return {
      type: { id: "", name: "" },
      types: [],
    };
  },
  methods: {
    async fetchTypes() {
      try {
        const response = await axiosInstance.get("/type");
        console.log(response);
        this.types = response;
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    },
    async addOrUpdateType() {
      try {
        await axiosInstance.post("/type", this.type);
        this.type.id = "";
        this.type.name = "";
        this.fetchTypes();
      } catch (error) {
        console.error("Error adding/updating type:", error);
      }
    },
    async editType() {
      try {
        await axiosInstance.patch(`/type/${this.type.id}`, this.type);
        this.type.id = "";
        this.type.name = "";
        this.fetchTypes();
      } catch (error) {
        console.error("Error editing type:", error);
      }
    },
    async deleteType() {
      try {
        await axiosInstance.delete(`/type/${this.type.id}`);
        this.type.id = "";
        this.fetchTypes();
      } catch (error) {
        console.error("Error editing type:", error);
      }
    },
  },
  async created() {
    await this.fetchTypes();
  },
  async updated() {
    await this.fetchTypes();
  },
};
</script>
