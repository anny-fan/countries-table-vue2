<script>
import Table from "./components/Table.vue";
import Filter from "./components/Filter.vue";
import Pagination from "./components/Pagination.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Table,
    Filter,
    Pagination,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "tableData",
      "modalContent",
      "currentPage",
      "filterText",
      "pageSize",
    ]),
  },
  methods: {},
  created() {
    this.$store.dispatch("getTableData");
  },
};
</script>

<template>
  <h2>Vue Countries Table</h2>
  <div class="container">
    <Filter></Filter>
    <Table></Table>
    <Pagination></Pagination>
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
                    <td>{{ modalContent }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
