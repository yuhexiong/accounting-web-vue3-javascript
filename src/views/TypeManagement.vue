<template>
  <div>
    <h2>類別維護</h2>
    <TypesFetcher :types="types" @types-fetched="types = $event" />
    <table>
      <thead>
        <tr>
          <th>代碼</th>
          <th>名稱</th>
          <th class="button-column"></th>
          <th class="button-column"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in types" :key="type.id">
          <td>{{ type.id }}</td>
          <td>
            <template v-if="type === editingType">
              <input v-model="type.name" @input="toggleEditType(type)" />
            </template>
            <template v-else>
              {{ type.name }}
            </template>
          </td>
          <td class="button-column">
            <button @click="toggleEditType(type)" v-if="type !== editingType">
              編輯
            </button>
            <button @click="saveEditedType(type)" v-else>儲存</button>
          </td>
          <td class="button-column">
            <button @click="deleteType(type.id)">刪除</button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td class="button-column"></td>
          <td class="button-column"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td><input v-model="type.id" type="text" /></td>
          <td><input v-model="type.name" type="text" /></td>
          <td colspan="2"><button @click="addType">新增類別</button></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<style>
@import "@/assets/tableStyle.css";
</style>

<script>
import { axiosInstance } from "../router/index";
import TypesFetcher from "@/components/TypesFetcher.vue";

export default {
  components: {
    TypesFetcher,
  },
  data() {
    return {
      type: { id: "", name: "" },
      types: [],
      editingType: null,
    };
  },
  methods: {
    async addType() {
      try {
        await axiosInstance.post("/type", this.type);
        this.type.id = "";
        this.type.name = "";
        this.fetchTypes();
      } catch (error) {
        console.error("Error adding type:", error);
      }
    },
    async toggleEditType(type) {
      this.editingType = type;
    },
    async saveEditedType(type) {
      try {
        axiosInstance
          .patch(`/type/${type.id}/${type.name}`)
          .then(() => {
            this.editingType = null;
            this.fetchTypes();
          })
          .catch((error) => {
            console.error("Error editing type:", error);
          });
      } catch (error) {
        console.error("Error editing type:", error);
      }
    },
    async deleteType(typeId) {
      try {
        await axiosInstance.delete(`/type/${typeId}`);
        this.fetchTypes();
      } catch (error) {
        console.error("Error deleting type:", error);
      }
    },
  },
  // async created() {
  //   await this.fetchTypes();
  // },
};
</script>
