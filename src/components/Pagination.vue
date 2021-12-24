<script>
export default {
  name: "Pagination",
  props: {
    currentPage: Number,
    data: Array,
    pageSize: Number,
  },
  data() {
    return {};
  },
  computed: {
    totalPage() {
      return Math.ceil(this.data.length / this.pageSize);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPage) this.$emit("next-page");
    },
    prevPage() {
      if (this.currentPage > 1) this.$emit("prev-page");
    },
    goToPage(page) {
      this.$emit("goToPage", page);
    },
  },
};
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
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
      <li class="page-item" :class="{ disabled: currentPage === totalPage }">
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
