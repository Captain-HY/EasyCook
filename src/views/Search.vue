<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        placeholder="想学点什么、想吃点什么"
        @search="onSearch"
      />
    </form>
    <div class="hop">
      <h2>🔥热门搜索</h2>
      <div class="hoplist">
        <div
          class="hop-item"
          v-for="(item, index) in hops"
          :key="index"
          @click="viewDetail(item.name)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: "",
      hops: [],
    };
  },

  created() {
    this.getHopSearch();
  },
  methods: {
    getHopSearch() {
      this.axios({
        method: "get",
        url: "/recipe/search/hot",
      })
        .then((result) => {
          // console.log("result->", result);
          if (result.data.state === "success") {
            this.hops = result.data.result.suggests;
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    onSearch(name) {
      this.$router.push({ name: "Detail", params: { name } });
    },
    viewDetail(name) {
      this.$router.push({ name: "Detail", params: { name } });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-field__left-icon {
  color: #ff8e4c;
}
.hop {
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 50px;
  .hoplist {
    width: 100%;
    height: 100%;
    .hop-item {
      padding: 10px;
      float: left;
      border-radius: 15px;
      margin: 5px 3px;
      box-shadow: 0px 2px 6px 0px #ff6d4c38;
      background-color: #fff;
    }
  }
}
</style>