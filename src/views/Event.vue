<template>
  <div class="eve">
    <div class="going-box">
      <div
        class="going-item"
        v-for="(gitem, index) in going.events"
        :key="index"
      >
        <div v-if="gitem.image">
          <h4>{{ gitem.name }}</h4>
          <span class="tip">{{ going.title }}</span>
          <van-image width="100%" fit="cover" :src="gitem.image" />
        </div>
      </div>
    </div>
    <div class="ended-box">
      <div
        class="ended-item"
        v-for="(eitem, indexs) in ended.events"
        :key="indexs"
      >
        <div v-if="eitem.image">
          <h4>{{ eitem.name }}</h4>
          <span class="tip">{{ ended.title }}</span>
          <van-image width="100%" fit="cover" :src="eitem.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Event",
  data() {
    return {
      going: {},
      ended: {},
    };
  },
  created() {
    this.getHomeEventData();
  },
  methods: {
    getHomeEventData() {
      this.axios({
        method: "get",
        url: "home/events/getlists",
      })
        .then((result) => {
          // console.log(result);
          if (result.data.status === "OK") {
            this.going = result.data.data.ongoing;
            this.ended = result.data.data.ended;
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.eve {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
overflow-y: auto;
  background-color: #fff;
  .going-box {
    width: 100%;


    .going-item {
      position: relative;
      margin-bottom: 10px;
      padding: 0 10px;
      .van-image {
        border-radius: 5px;
        overflow: hidden;
      }
      h4 {
        margin: 2px 0;
      }
      .tip {
        padding: 2px 5px;
        background-color: #ff614c;
        border-radius: 5px;
        position: absolute;
        bottom: 165px;
        left: 30px;
        z-index: 5;
        color: #fff;
      }
    }
  }
  .ended-box {
    width: 100%;


    .ended-item {
      position: relative;
      margin-bottom: 10px;
      padding: 0 10px;
      .van-image {
        border-radius: 5px;
        overflow: hidden;
      }
      h4 {
        margin: 2px 0;
      }
      .tip {
        padding: 2px 5px;
        background-color: #ff614c;
        border-radius: 5px;
        position: absolute;
        bottom: 160px;
        left: 20px;
        z-index: 5;
        color: #fff;
      }
    }
  }
}
</style>