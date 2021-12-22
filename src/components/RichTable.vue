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
      inputText: "",
      tableData: [],
      filterText: "",
      moreInfo: "",
      sortDir: "asc",
      pageSize: 25,
      currentPage: 1,
    };
  },
  computed: {
    filteredList() {
      return this.tableData
        .filter((item) => {
          return item.name.official
            .toLowerCase()
            .includes(this.filterText.toLowerCase());
        })
        .sort((a, b) => {
          let modifier = this.sortDir === "desc" ? -1 : 1;
          // if (this.sortDir === "desc") modifier = -1;
          if (a["name"].official < b["name"].official) return -1 * modifier;
          if (a["name"].official > b["name"].official) return 1 * modifier;
          return 0;
        });
      // 不能在這裡切分頁，因為會修改到原始資料，就只會有當前第一頁的資料
      // .filter((row, index) => {
      //   let start = (this.currentPage - 1) * this.pageSize;
      //   let end = this.currentPage * this.pageSize;
      //   if (index >= start && index < end) return true;
      // })
    },
    pageData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      console.log("processed data", this.filteredList);
      // return this.filteredList.filter((row, index) => {
      //   // console.log("index", index);
      //   return index >= start && index < end;
      // });
      return this.filteredList.slice(start, end);
    },
    totalPage() {
      return Math.ceil(this.filteredList.length / this.pageSize);
    },
    isTableShow() {
      return this.tableData.length > 0;
    },
  },
  methods: {
    // TODO: await/async
    showMoreInfo(country) {
      this.moreInfo = "";
      axios
        .get("https://restcountries.com/v3.1/name/" + country.name.official)
        .then((response) => {
          this.moreInfo = response.data[0].region;
        });
    },
    sort: function () {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    },
    toFilterData() {
      this.currentPage = 1;
      this.filterText = this.inputText;
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.filteredList.length)
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  created() {
    axios
      .get(
        "https://restcountries.com/v3/all?fields=flags,name,cca2,cca3,altSpellings,idd"
      )
      .then((response) => {
        console.log("original data", response.data);
        this.tableData = response.data;
      });
  },
};
</script>

<template>
  <div class="container">
    <div class="mb-4">
      <div class="row col-4">
        <input
          type="text"
          class="form-control col"
          id="filter"
          v-model.trim="inputText"
          placeholder="Country Name..."
        />
        <div class="col-2">
          <button type="button" class="btn btn-primary" @click="toFilterData()">
            filter
          </button>
        </div>
      </div>
    </div>
    <table class="table" v-show="isTableShow">
      <thead>
        <th>序號</th>
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
        <tr v-for="(country, index) in pageData" :key="index">
          <td>{{ pageSize * (currentPage - 1) + index + 1 }}</td>
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
          <td>{{ country.idd.root + country.idd.suffixes[0] }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" @click="prevPage">Previous</a>
        </li>
        <li
          :class="{ active: page === currentPage }"
          class="page-item"
          v-for="(page, i) in totalPage"
          :key="i"
          @click="goToPage(page)"
        >
          <a class="page-link">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>
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
.pagination {
  cursor: pointer;
  user-select: none;
}
</style>
