<script>
import axios from "axios";
// import RichTable from "./components/RichTable.vue";
import Table from "./components/Table.vue";
import Filter from "./components/Filter.vue";
import Pagination from "./components/Pagination.vue";

export default {
  name: "App",
  components: {
    // RichTable,
    Table,
    Filter,
    Pagination,
  },
  data() {
    return {
      tableData: [],
      modalContent: "",
      currentPage: 1,
      filterText: "",
      pageSize: 25,
    };
  },
  computed: {
    filteredList() {
      return this.tableData.filter((item) => {
        return item.name.official
          .toLowerCase()
          .includes(this.filterText.toLowerCase());
      });
    },
  },
  methods: {
    // TODO: await/async?
    showInfo(country) {
      this.modalContent = "";
      axios
        .get("https://restcountries.com/v3.1/name/" + country.name.official)
        .then((response) => {
          this.modalContent = response.data[0].region;
        });
    },
    filterCountries(text) {
      this.currentPage = 1;
      this.filterText = text;
    },
    increaseCurrPage() {
      this.currentPage++;
    },
    decreaseCurrPage() {
      this.currentPage--;
    },
    changeCurrPage(page) {
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
  <h2>Vue Countries Table</h2>
  <div class="container">
    <!-- <RichTable></RichTable> -->
    <Filter @filter="filterCountries"></Filter>
    <Table
      :data="filteredList"
      :countryToFilter="filterText"
      :current-page="currentPage"
      :page-size="pageSize"
      @moreInfo="showInfo"
    ></Table>
    <Pagination
      :current-page="currentPage"
      :data="filteredList"
      :page-size="pageSize"
      @next-page="increaseCurrPage"
      @prev-page="decreaseCurrPage"
      @go-to-page="changeCurrPage"
    ></Pagination>
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
