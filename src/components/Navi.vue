<template>
  <div class="navi">
    <van-nav-bar
      :title="title"
      :right-text="rightText"
      :fixed="fixed"
      left-arrow
      @click-left="back"
    />
  </div>
</template>

<script>
export default {
  name: "Navi",
  props: {
    title: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    fixed: {
      type: Boolean,
      default: "",
    },
  },

  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.navi {
  /deep/ .van-nav-bar .van-icon {
    color: #ff8e4c;
  }

}
</style>