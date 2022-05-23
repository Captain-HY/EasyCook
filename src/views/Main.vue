<template>
  <div class="main">
    <div class="box">
      <router-view />
    </div>

    <van-tabbar
      v-model="activeIndex"
      active-color="#ff614c"
      inactive-color="#333"
      route
    >
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="{ name: item.routeName }"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
  data() {
    return {
      activeIndex: 0,
      tabbarData: [
        {
          title: "厨房",
          routeName: "Home",
          activeIcon: require("../assets/home-a.png"),
          inactiveIcon: require("../assets/home.png"),
        },
        {
          title: "分类",
          routeName: "Cate",
          activeIcon: require("../assets/cate-a.png"),
          inactiveIcon: require("../assets/cate.png"),
        },
        {
          title: "搜索",
          routeName: "Search",
          activeIcon: require("../assets/search-a.png"),
          inactiveIcon: require("../assets/search.png"),
        },
        {
          title: "笔记",
          routeName: "Note",
          activeIcon: require("../assets/pu-a.png"),
          inactiveIcon: require("../assets/pu.png"),
        },
      ],
    };
  },
};
</script>

<style lang="less">
body {
  background-color: #f4f4f4;
  .box {
    height: 100%;
  }
}
</style>