import { createStore } from "vuex";
import axiosInstance from "../router/index";

const store = createStore({
  state: {
    types: [],
    consumptions: [],
  },
  mutations: {
    addType(state, newType) {
      state.types.push(newType);
    },
    updateType(state, updatedType) {
      const index = state.types.findIndex((type) => type.id === updatedType.id);
      if (index !== -1) {
        state.types[index] = updatedType;
      }
    },
    deleteType(state, typeId) {
      state.types = state.types.filter((type) => type.id !== typeId);
    },
    addConsumption(state, newConsumption) {
      state.consumptions.push(newConsumption);
    },
    updateConsumption(state, updatedConsumption) {
      const index = state.consumptions.findIndex((consumption) => consumption.id === updatedConsumption.id);
      if (index !== -1) {
        state.consumptions[index] = updatedConsumption;
      }
    },
    deleteConsumption(state, consumptionId) {
      state.consumptions = state.consumptions.filter((consumption) => consumption.id !== consumptionId);
    },
  },
  actions: {
    async createType({ commit }, newType) {
      try {
        const response = await axiosInstance.post('/type', newType);
        commit('addType', response.data);
      } catch (error) {
        console.error("Error creating type:", error);
      }
    },
    async createConsumption({ commit }, newConsumption) {
      try {
        const response = await axiosInstance.post("/consumption", newConsumption);
        commit("addConsumption", response.data);
      } catch (error) {
        console.error("Error creating consumption:", error);
      }
    },
    async updateConsumption({ commit }, updatedConsumption) {
      try {
        await axiosInstance.patch(`/consumption/${updatedConsumption.id}`, updatedConsumption);
        commit("updateConsumption", updatedConsumption);
      } catch (error) {
        console.error("Error updating consumption:", error);
      }
    },
    async deleteConsumption({ commit }, consumptionId) {
      try {
        await axiosInstance.delete(`/consumption/${consumptionId}`);
        commit("deleteConsumption", consumptionId);
      } catch (error) {
        console.error("Error deleting consumption:", error);
      }
    },
    // Implement similar actions for updating and deleting types
  },
  getters: {
    totalConsumptionThisMonth: (state) => {
      // Get the current date
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1.
  
      // Filter consumptions for the current month
      const consumptionsThisMonth = state.consumptions.filter((consumption) => {
        const consumptionDate = new Date(consumption.date);
        const consumptionYear = consumptionDate.getFullYear();
        const consumptionMonth = consumptionDate.getMonth() + 1;
  
        return consumptionYear === currentYear && consumptionMonth === currentMonth;
      });
  
      // Calculate the total consumption for the current month
      const total = consumptionsThisMonth.reduce((acc, consumption) => acc + consumption.amount, 0);
  
      return total;
    },
    // Add more getters as needed
  },
  
});

export default store;
