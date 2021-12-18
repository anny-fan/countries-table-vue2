<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
// TODO: 在main.js引入

let tableData = ref([]);

onMounted(() => {
  axios
    .get(
      "https://restcountries.com/v3/all?fields=flag,name,cca2,cca3,altSpellings,idd"
    )
    .then(function (response) {
      tableData.value = response.data;
      console.log(response.data);
    });
});
</script>
<template>
  <div class="container">
    <table class="table" v-show="tableData.length > 0">
      <thead>
        <th>國旗</th>
        <th>國家名稱</th>
        <th>2位國家代碼</th>
        <th>3位國家代碼</th>
        <th>母語名稱</th>
        <th>替代國家名稱</th>
        <th>國際電話區號</th>
      </thead>
      <tbody>
        <tr v-for="(country, index) in tableData" :key="index">
          <td>{{ country.flag }}</td>
          <td>{{ country.name.official }}</td>
          <td>{{ country.name.official }}</td>
          <td>{{ country.cca2 }}</td>
          <td>{{ country.cca3 }}</td>
          <td>{{ country.name.official }}</td>
          <td>{{ country.name.official }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
thead {
  white-space: nowrap;
}
</style>
