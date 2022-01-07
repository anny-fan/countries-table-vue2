<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Filter",
  data() {
    return {};
  },
  computed: {
    ...mapState(["inputText", "filterText"]),
  },
  methods: {
    ...mapMutations(["filterData"]),
    updateInputText(e) {
      this.$store.commit("updateInputText", e.target.value);
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
        @input="updateInputText"
        placeholder="Country Name..."
        @keyup.enter="filterData"
      />
      <div class="col-2">
        <button type="button" class="btn btn-primary" @click="filterData">
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
