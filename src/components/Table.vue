<script>
export default {
  name: "Table",
  props: {
    data: Array,
  },
  data() {
    return {
      inputText: "",
      filterText: "",
      moreInfo: "",
      sortDir: "asc",
      pageSize: 25,
      currentPage: 1,
    };
  },
  computed: {
    filteredList() {
      return this.data
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
      //   return index >= start && index < end;
      // });
      return this.filteredList.slice(start, end);
    },
    totalPage() {
      return Math.ceil(this.filteredList.length / this.pageSize);
    },
    isTableShow() {
      return this.data.length > 0;
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
  },
};
</script>

<template>
  <table class="table" v-show="isTableShow">
    <thead>
      <th>序號</th>
      <th>國旗</th>
      <th class="sort" @click="sort">
        國家名稱<i
          :class="[
            'bi',
            sortDir === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-down-alt',
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
