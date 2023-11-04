<template>
  <div></div>
</template>

<script>
import { ref, onMounted } from "vue";
import { axiosInstance } from "@/router/index";

export default {
  props: {
    types: Array,
  },
  setup(props, { emit }) {
    const fetchedTypes = ref([]);

    const fetchTypes = async () => {
      try {
        const response = await axiosInstance.get("/type");
        fetchedTypes.value = response.data;
        emit("types-fetched", fetchedTypes.value);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    onMounted(() => {
      fetchTypes();
    });

    return { fetchedTypes };
  },
};
</script>
