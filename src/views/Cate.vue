<template name="Cate">
  <div class="cate">
    <div class="menu">
      <div class="menu-left">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item
            v-for="(item, index) in product"
            :key="index"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="menu-right">
        <div class="cate-box">
          <div
            class="cate-item"
            v-for="(item, index) in pp"
            :key="index"
            @click="viewDetail(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cate",
  created() {
    this.getMoreData();
  },
  mouted() {
    this.pps();
  },
  data() {
    return {
      activeKey: 0,
      product: [],
      pp: [],
    };
  },

  methods: {
    getMoreData() {
      this.axios({
        method: "get",
        url: "/recipe/flatcatalogs",
      })
        .then((result) => {
          //   console.log("result->", result);
          if (result.data.state === "success") {
            this.product = result.data.result.cs;
            this.pp = result.data.result.cs[this.activeKey].cs;
          }
        })
        .catch((err) => {
          // console.log("err->", err);
        });
    },
    onChange(index) {
      this.pp = this.product[index].cs;
      //   console.log(this.pp);
    },
    viewDetail(name) {
      // console.log("name->", name);
      this.$router.push({ name: "Detail", params: { name } });
    },
  },
};
</script>

<style lang="less" scoped>
.cate {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
}
.menu {
  display: flex;
  height: 100%;

  .menu-left {
    height: 100%;
  }
  .menu-right {
    width: calc(100% -80px);
    height: 100%;
    background-color: #fff;
    overflow-y: auto;
    .cate-box {
      margin: 10px 0;
    }
    .cate-item {
      width: 120px;
      height: 50px;
      //   border: 1px solid #333;
      border-radius: 25px;
      float: left;
      margin-left: 20px;
      margin-bottom: 20px;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      box-shadow: 0px 2px 6px 0px #ff6d4c38;
    }
  }
}
.van-sidebar {
  height: 100%;

  .van-sidebar-item {
    text-align: center;

    &::before {
      background-color: #ff614c;
      height: 30px;
    }
  }
  .van-sidebar-item--select {
    color: #ff614c;
  }
}
</style>