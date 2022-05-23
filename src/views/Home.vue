<template name="home">
  <div class="home">
    <van-tabs
      v-model="activeName"
      color="#ff614c"
      line-width="50px"
      title-active-color="#ff614c"
      route
    >
      <van-tab
        v-for="(item, index) in tabs"
        :key="index"
        :title="item.title"
        :to="{ name: item.routeName }"
        :name="item.routeName"
        :replace="true"
      >
        <router-view />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      activeName: "find",
      show: true,
      tabs: [
        {
          title: "推荐",
          routeName: "find",
        },
        {
          title: "关注",
          routeName: "focus",
        },

        {
          title: "活动",
          routeName: "event",
        },
      ],
    };
  },
  created() {
    this.nochange();
  },
  methods: {
    nochange() {
      var cur_path = this.$route.path; //获取当前路由
      var activeChange = cur_path.split("/home/")[1];

      this.activeName = activeChange;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  .van-tabs {
    height: 100%;
    height: 100%;
  }
}
</style>