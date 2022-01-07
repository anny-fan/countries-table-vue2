<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Table",
  data() {
    return {};
  },
  computed: {
    ...mapState(["moreInfo", "sortDir", "pageSize", "currentPage"]),
    ...mapGetters(["pageData", "isTableShow"]),
  },
  methods: {
    ...mapMutations(["sort"]),
    showMoreInfoByRow(country) {
      this.$store.dispatch({
        type: "showMoreInfo",
        country: country,
      });
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
          @click="showMoreInfoByRow(country)"
          class="clickable"
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
    user-select: none;
  }
}
.clickable {
  cursor: pointer;
}
</style>
