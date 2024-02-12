<template>
  <div class="views-div">
    <table style="width: 93%">
      <thead>
        <tr>
          <th class="date-column" style="width: 110px">日期</th>
          <th style="width: 120px">類別</th>
          <th style="width: 120px">名稱</th>
          <th style="width: 80px">金額</th>
          <th>註記</th>
          <th class="button-column">編輯</th>
          <th class="button-column">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consumption in consumptions" :key="consumption.id">
          <td class="date-column">{{ consumption.date }}</td>
          <td>
            <template v-if="consumption === editingConsumption">
              <select
                v-model="consumption.typeId"
                @change="toggleEditConsumption(consumption)"
              >
                <option v-for="type in types" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </template>
            <template v-else>
              {{ getTypeName(consumption.typeId) }}
            </template>
          </td>
          <td>
            <template v-if="consumption === editingConsumption">
              <input
                v-model="consumption.name"
                style="width: 85px"
                @input="toggleEditConsumption(consumption)"
              />
            </template>
            <template v-else>
              {{ consumption.name }}
            </template>
          </td>
          <td>
            <template v-if="consumption === editingConsumption">
              <input
                v-model="consumption.amount"
                style="width: 65px"
                @input="toggleEditConsumption(consumption)"
              />
            </template>
            <template v-else>
              {{ consumption.amount }}
            </template>
          </td>
          <td>
            <template v-if="consumption === editingConsumption">
              <input
                v-model="consumption.note"
                style="width: 255px"
                @input="toggleEditConsumption(consumption)"
              />
            </template>
            <template v-else>
              {{ consumption.note }}
            </template>
          </td>
          <td class="button-column">
            <button
              @click="toggleEditConsumption(consumption)"
              v-if="consumption !== editingConsumption"
            >
              編輯
            </button>
            <button @click="saveEditedConsumption(consumption)" v-else>
              儲存
            </button>
          </td>
          <td class="button-column">
            <button @click="deleteConsumption(consumption.id)">刪除</button>
          </td>
        </tr>
        <tr>
          <td class="date-column"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="button-column"></td>
          <td class="button-column"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="date-column">{{ todayDate }}</td>
          <td>
            <select v-model="consumption.typeId">
              <option v-for="type in types" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </td>
          <td>
            <input v-model="consumption.name" type="text" style="width: 85px" />
          </td>
          <td>
            <input
              v-model="consumption.amount"
              type="text"
              style="width: 65px"
            />
          </td>
          <td>
            <input
              v-model="consumption.note"
              type="text"
              style="width: 255px"
            />
          </td>
          <td colspan="2" class="insert-button-tb">
            <button @click="addConsumption">新增</button>
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
import moment from "moment";

export default {
  props: {
    types: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    todayDate() {
      return moment().format("YYYY-MM-DD");
    },
  },
  data() {
    return {
      consumption: {
        id: "",
        typeId: "",
        name: "",
        amount: "",
        note: "",
      },
      consumptions: [],
      editingConsumption: null,
    };
  },
  methods: {
    refreshTypes() {
      this.$emit("refresh");
    },
    getTypeName(typeId) {
      const type = this.types.find((type) => type.id === typeId);
      return type ? type.name : "";
    },
    async fetchConsumptions() {
      try {
        const response = await axiosInstance.get("/consumption");
        this.consumptions = response.data;
      } catch (error) {
        console.error("Error fetching consumptions:", error);
      }
    },
    async addConsumption() {
      try {
        await axiosInstance.post("/consumption", this.consumption);
        this.clearConsumptionForm();
        this.fetchConsumptions();
      } catch (error) {
        console.error("Error adding consumption:", error);
      }
    },
    async toggleEditConsumption(consumption) {
      this.editingConsumption = consumption;
    },
    async saveEditedConsumption(consumption) {
      try {
        await axiosInstance
          .put(`/consumption/${consumption.id}`, consumption)
          .then(() => {
            this.editingConsumption = null;
            this.fetchConsumptions();
          });
      } catch (error) {
        console.error("Error editing consumption:", error);
      }
    },
    async deleteConsumption(consumptionId) {
      try {
        await axiosInstance.delete(`/consumption/${consumptionId}`);
        this.fetchConsumptions();
      } catch (error) {
        console.error("Error deleting consumption:", error);
      }
    },
    clearConsumptionForm() {
      this.consumption = {
        id: "",
        typeId: "",
        name: "",
        amount: "",
        note: "",
      };
    },
  },
  async created() {
    this.refreshTypes();
    this.fetchConsumptions();
  },
};
</script>
