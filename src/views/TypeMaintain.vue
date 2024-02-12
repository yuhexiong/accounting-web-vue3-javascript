<template>
  <div class="views-div">
    <table style="width: 50%">
      <thead>
        <tr>
          <th>代碼</th>
          <th>名稱</th>
          <th class="button-column">編輯</th>
          <th class="button-column">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in types" :key="type.id">
          <td>{{ type.id }}</td>
          <td>
            <template v-if="type === editingType">
              <input
                v-model="type.name"
                style="width: 155px"
                @input="toggleEditType(type)"
              />
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
          <td><input v-model="type.id" type="text" style="width: 155px" /></td>
          <td>
            <input v-model="type.name" type="text" style="width: 155px" />
          </td>
          <td colspan="2" class="insert-button-tb">
            <button @click="addType">新增</button>
          </td>
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

export default {
  props: {
    types: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      type: { id: "", name: "" },
      editingType: null,
    };
  },
  methods: {
    refreshTypes() {
      this.$emit("refresh");
    },
    async addType() {
      try {
        await axiosInstance.post("/type", this.type);
        this.type.id = "";
        this.type.name = "";
        this.refreshTypes();
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
            this.refreshTypes();
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
        this.refreshTypes();
      } catch (error) {
        console.error("Error deleting type:", error);
      }
    },
  },
  async created() {
    this.refreshTypes();
  },
};
</script>
