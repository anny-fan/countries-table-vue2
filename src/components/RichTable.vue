<!-- TODO: vue3 composition API -->
<!-- <script setup>
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
</script> -->

<script>
import axios from "axios";

export default {
  name: "RichTable",
  data() {
    return {
      tableData: undefined,
      filteredList: [],
      filter: "",
      moreInfo: "",
      sortDir: "asc",
      pageSize: 3,
      currentPage: 1,
    };
  },
  computed: {
    filteredList() {
      return this.tableData?.filter((item) => {
        return item.name.official
          .toLowerCase()
          .includes(this.filter.toLowerCase());
      });
    },
  },
  methods: {
    // TODO: await/async
    showMoreInfo(country) {
      axios
        .get("https://restcountries.com/v3.1/name/" + country.name.official)
        .then((response) => {
          this.moreInfo = response.data[0].region;
        });
    },
    sort() {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";

      this.tableData.sort((a, b) => {
        let modifier = 1;
        if (this.sortDir === "desc") modifier = -1;
        if (a["name"].official < b["name"].official) return -1 * modifier;
        if (a["name"].official > b["name"].official) return 1 * modifier;
        return 0;
      });
    },
  },
  created() {
    axios
      .get(
        "https://restcountries.com/v3/all?fields=flags,name,cca2,cca3,altSpellings,idd"
      )
      .then((response) => {
        console.log(response.data);
        this.tableData = response.data;
      });
  },
};
</script>

<template>
  <div class="container">
    <div class="row mb-4">
      <div class="row col-4">
        <label for="filter" class="col-2 col-form-label">filter:</label>
        <div class="col-10">
          <input
            type="text"
            class="form-control"
            id="filter"
            v-model.trim="filter"
            placeholder="Country Name..."
          />
        </div>
      </div>
    </div>
    <table class="table" v-show="tableData">
      <thead>
        <th>國旗</th>
        <th class="sort" @click="sort()">
          國家名稱<i
            :class="[
              'bi',
              sortDir === 'asc'
                ? 'bi-sort-alpha-down'
                : 'bi-sort-alpha-down-alt',
            ]"
          ></i>
        </th>
        <th>2位國家代碼</th>
        <th>3位國家代碼</th>
        <th>母語名稱</th>
        <th>替代國家名稱</th>
        <th>國際電話區號</th>
      </thead>
      <tbody>
        <tr v-for="(country, index) in filteredList" :key="index">
          <td><img :src="country.flags[1]" alt="" width="40" /></td>
          <td
            data-bs-toggle="modal"
            data-bs-target="#moreInfoModal"
            @click="showMoreInfo(country)"
          >
            {{ country.name.official }}
          </td>
          <td>{{ country.cca2 }}</td>
          <td>{{ country.cca3 }}</td>
          <td>{{ country.name.nativeName }}</td>
          <td>{{ country.altSpellings }}</td>
          <td>{{ country.idd.root }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    class="modal fade"
    id="moreInfoModal"
    tabindex="-1"
    aria-labelledby="moreInfoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="moreInfoModalLabel">Region</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <table class="table align-middle">
              <tbody>
                <tr>
                  <td>{{ moreInfo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
thead {
  white-space: nowrap;
  th.sort {
    cursor: pointer;
  }
}
</style>
