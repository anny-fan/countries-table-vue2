<!-- <script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import RichTable from "./components/RichTable.vue";
</script> -->

<script>
import RichTable from "./components/RichTable.vue";

export default {
  name: "App",
  components: {
    RichTable,
  },
};
</script>

<template>
  <h2>Vue Countries Table</h2>
  <RichTable />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
