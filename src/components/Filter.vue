<script>
export default {
  name: "Filter",
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
  },
  methods: {
    filterData() {
      this.currentPage = 1;
      this.filterText = this.inputText;
    },
  },
};
</script>

<template>
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
        <button type="button" class="btn btn-primary" @click="filterData()">
          filter
        </button>
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
