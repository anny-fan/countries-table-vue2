import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    tableData: [],
    modalContent: "",
    currentPage: 1,
    filterText: "",
    pageSize: 25,
    sortDir: "asc",
    inputText: "",
  },
  getters: {
    filteredList: (state) => {
      return state.tableData.filter((item) => {
        return item.name.official
          .toLowerCase()
          .includes(state.filterText.toLowerCase());
      });
    },
    // table
    sortedList(state, getters) {
      return getters.filteredList.sort((a, b) => {
        let modifier = state.sortDir === "desc" ? -1 : 1;
        if (a["name"].official < b["name"].official) return -1 * modifier;
        if (a["name"].official > b["name"].official) return 1 * modifier;
        return 0;
      });
    },
    pageData(state, getters) {
      let start = (state.currentPage - 1) * state.pageSize;
      let end = state.currentPage * state.pageSize;
      console.log("processed data", getters.sortedList);
      return getters.sortedList.slice(start, end);
    },
    isTableShow(_, getters) {
      return getters.pageData.length > 0;
    },
    // pagination
    totalPage(state, getters) {
      return Math.ceil(getters.filteredList.length / state.pageSize);
    },
  },
  mutations: {
    // app
    setTableData(state, data) {
      console.log("tableData", data);
      state.tableData = data;
      console.log("after set tableData", data);
    },
    displayModalContent(state, content) {
      state.modalContent = content;
    },
    // pagination
    nextPage(state) {
      state.currentPage++;
    },
    prevPage(state) {
      state.currentPage--;
    },
    goToPage(state, page) {
      state.currentPage = page;
    },
    // table
    sort(state) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    },
    // filter
    filterData(state) {
      state.currentPage = 1;
      state.filterText = state.inputText;
    },
    updateInputText(state, text) {
      state.inputText = text;
    },
  },
  actions: {
    getTableData({ commit }) {
      axios
        .get(
          "https://restcountries.com/v3/all?fields=flags,name,cca2,cca3,altSpellings,idd"
        )
        .then((response) => {
          console.log("original data", response.data);
          commit("setTableData", response.data);
        });
    },
    showMoreInfo({ commit, state }, payload) {
      state.modalContent = "";
      console.log(payload.country);
      axios
        .get(
          "https://restcountries.com/v3.1/name/" + payload.country.name.official
        )
        .then((response) => {
          let content = response.data[0].region;
          commit("displayModalContent", content);
        });
    },
  },
  modules: {},
});

export default store;
