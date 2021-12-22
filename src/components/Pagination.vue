<script>
export default {
  name: "Pagination",
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
};
</script>

<template>
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
