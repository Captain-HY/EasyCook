<template>
  <div class="find">
    <van-swipe :autoplay="5000" :height="113">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img v-lazy="image.i" />
      </van-swipe-item>
    </van-swipe>
    <div class="toplist">
      <h2><van-icon name="fire" color="#ff6e4c" />热门话题</h2>
      <div class="top">
        <div class="top-box">
          <div class="top-item" v-for="(itop, intop) in toplist" :key="intop">
            <p>{{ itop.name }}</p>
            <van-image
              width="4rem"
              height="1.6rem"
              fit="cover"
              :src="itop.cover_image"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tui">
      <h2>📅每日推荐</h2>
      <div class="tui-box">
        <div class="tui-cont">
          <div class="tui-item" v-for="(item, index) in list" :key="index">
            <div v-if="item.r">
              <van-image
                width="150px"
                height="180px"
                fit="cover"
                :src="item.r.img"
                @click="detailItem(item.r.id)"
              />
              <div class="item-tit">
                <h4>{{ item.r.n }}</h4>
                <span class="tit-left">{{ item.r.a.n }}</span>
                <span class="tit-right"
                  >{{ item.r.fc }}<van-icon name="like-o"
                /></span>
              </div>
            </div>
            <div v-if="item.note">
              <van-image
                width="150px"
                height="180px"
                fit="cover"
                :src="item.note.image_u_webp"
                @click="noteItem(item.note.id)"
              />
              <div class="item-tit">
                <h4>{{ item.note.title }}</h4>
                <span class="tit-left">{{ item.note.author.n }}</span>
                <span class="tit-right"
                  >{{ item.note.like_count }}<van-icon name="like-o"
                /></span>
              </div>
            </div>
            <div v-if="item.dsp">
              <van-image
                width="150px"
                height="180px"
                fit="cover"
                :src="item.dsp.i"
                v-show="item.dsp.i"
              />
              <van-image
                width="150px"
                height="180px"
                fit="cover"
                :src="item.dsp.logo"
                v-show="item.dsp.logo"
              />
              <div class="item-tit">
                <h4>【广告】{{ item.dsp.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Find",
  data() {
    return {
      toplist: [],
      list: [],
      banner: [],
    };
  },
  created() {
    this.getHomeFindData();
    this.getHomeFindTopData();
  },
  methods: {
    detailItem(id) {
      // console.log(id)
      this.$router.push({ name: "Item", params: { id } });
    },
    noteItem(id) {
      // console.log(id)
      this.$router.push({ name: "NoteDetail", params: { id } });
    },
    getHomeFindData() {
      this.axios({
        method: "get",
        url: "/home/recommended/0/10",
      })
        .then((result) => {
          // console.log(result);
          if (result.data.state === "success") {
            this.list = result.data.result.list;
            this.banner = result.data.result.banner;
            // console.log(this.list);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    getHomeFindTopData() {
      this.axios({
        method: "get",
        url: "/note/topiclist/0/20",
      })
        .then((result) => {
          // console.log(result);
          if (result.data.state === "success") {
            this.toplist = result.data.result.list;
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
.find {
  background-color: #fff;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
}
.toplist {
  overflow: hidden;
  height: 180px;
  width: 100%;

  .top {
    overflow-x: auto;
    width: 100%;
    margin-left: 10px;
    .top-box {
      width: 700px;
    }
  }
  h2 {
    margin: 5px 0;
    padding-left: 10px;
  }
  .top-item {
    width: 150px;
    height: 60px;
    position: relative;
    float: left;
    border-radius: 10px;
    overflow: hidden;
    margin: 5px 10px;

    P {
      font-size: 16px;
      width: 150px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      margin: 0;
      position: absolute;
      top: 0;
      background-color: rgba(102, 102, 102, 0.5);
      z-index: 5;
      color: #fff;
    }
  }
}
.tui {
  height: 264px;
  width: 100%;

  overflow-y: hidden;
  h2 {
    margin: 0 0 5px 0;
    padding-left: 10px;
  }
  .tui-box {
    height: 100%;
    width: 100%;
    padding-left: 10;
    overflow-x: auto;

    .tui-cont {
      width: 1610px;
    }
    .tui-item {
      width: 150px;
      margin-left: 10px;
      float: left;
      border-radius: 10px;
      /deep/.van-image {
        border-radius: 5px;
        overflow: hidden;
      }
      .item-tit {
        height: 37px;
        .tit-left {
          float: left;
          width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          color: #666;
        }
        .tit-right {
          float: right;
          color: #666;
        }
      }
      h4 {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.van-swipe-item {
  img {
    width: 100%;
  }
}
</style>