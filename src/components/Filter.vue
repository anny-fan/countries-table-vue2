<script>
export default {
  name: "Filter",
  data() {
    return {
      inputText: "",
      filterText: "",
    };
  },
  computed: {},
  methods: {
    filterData() {
      this.filterText = this.inputText;
      this.$emit("filter", this.filterText);
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
