<template>
  <div class="focus">
    <van-list
      :finished="finished"
      finished-text="没有更多了"
      @load="getHomeFocusData"
    >
      <div class="focus-item" v-for="(item, index) in focus" :key="index">
        <div class="item-tit">
          <van-image
            round
            width="50px"
            height="50px"
            fit="cover"
            :src="item.u.p"
          />
          <p class="tit-name">{{ item.u.n }}</p>
          <p class="tit-time">{{ item.act }}</p>
        </div>
        <div class="said">
          {{ item.n }}
        </div>
        <van-image
          class="vi"
          width="100%"
          fit="cover"
          :src="item.img"
          @click="detailItem(item.item_id)"
        />
        <div class="item-cc">
          <div class="item-like"><van-icon name="like-o" />{{ item.fc }}</div>
          <div class="item-eye"><van-icon name="eye-o" />{{ item.vc }}</div>
        </div>
        <div class="coll">
          <van-image
            round
            v-for="(colls, indexs) in item.collect_users"
            :key="indexs"
            width="30px"
            height="30px"
            fit="cover"
            :src="colls.p"
          />
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "focus",
  data() {
    return {
      focus: [],
      loading: false,
      finished: false,
      ids: 0,
    };
  },
  // created() {
  //   this.firsgetDate();
  // },
  methods: {
    detailItem(id) {
      // console.log(id)
      this.$router.push({ name: "Item", params: { id } });
    },

    getHomeFocusData() {
      this.axios({
        method: "get",
        url: "/home/ffeeds/" + this.ids + "/10",
      })
        .then((result) => {
          if (result.data.state === "success") {
            this.ids++;
            result.data.result.rfs.forEach((element) => {
              this.focus.push(element);
            });
            // console.log(this.focus);
            this.loading = false;
          }
        })
        .catch((err) => {
          // console.log(err);
        });
      // 加载状态结束
    },
  },
};
</script>

<style lang="less" scoped>
.focus {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.focus-item {
  margin: 5px 10px;
  overflow: hidden;
  background-color: #fff;
  padding: 0 10px;
  .said {
    // padding: 0 10px;
    color: #666;
    margin: 10px 0;
  }
  .vi {
    border-radius: 5px;
    overflow: hidden;
    // margin-left: 10px;
  }
  .item-tit {
    margin: 10px 0;
    // margin-left: 10px;
    .van-image {
      float: left;
      margin-right: 10px;
    }
    .tit-name {
      font-weight: 600;
      margin-bottom: 5px;
      padding-top: 8px;
      font-size: 14px;
    }
    .tit-time {
      color: #666;
      margin-top: 5px;
    }
  }
  .coll {
    .van-image {
      margin: 0 5px;
    }
  }
  .item-cc {
    padding: 10px 0;
    width: 100%;
    overflow: hidden;

    .item-like {
      float: left;
    }
    .item-eye {
      float: left;
      margin-left: 10px;
    }
  }
}
</style>