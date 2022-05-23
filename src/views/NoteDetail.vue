<template>
  <div class="noteDetail">
    <Navi :fixed="true" title="笔记正文" />
    <div class="content">
      <div class="user" v-if="data.author" @click="viewUser(data.author.id)">
        <van-image
          round
          width="60px"
          height="60px"
          fit="cover"
          :src="data.author.p"
        />
        <p class="name">{{ data.author.n }}</p>
        <p class="time">{{ data.publishtime }}</p>
      </div>
      <div class="cont">
        <p class="user-said">{{ data.title }}</p>
        <van-grid
          v-if="data.images"
          :column-num="
            data.images.length < 2 ? 1 : data.images.length < 5 ? 2 : 3
          "
          :border="false"
          square
        >
          <van-grid-item v-for="(img, ind) in data.images" :key="ind">
            <van-image fit="cover" :src="img.u" @click="imgin(data.images)" />
          </van-grid-item>
        </van-grid>
        <div>
          <span
            >{{ data.like_count }}<van-icon color="#ff614c" name="like-o"
          /></span>
        </div>
      </div>
      <div class="hot">
        {{ data.selection_text }}
      </div>
      <div class="foot">
        <div class="foot-item" v-for="(cs, indexx) in data.cs" :key="indexx">
          <van-image
            round
            width="20px"
            height="20px"
            fit="cover"
            :src="cs.u.p"
          />
          <p class="csu">{{ cs.u.n }}:</p>
          <p v-for="(cc, ins) in cs.content" :key="ins">
            {{ cc.c }}
          </p>
        </div>
      </div>
    </div>
    <van-image-preview v-model="show" :images="images" @change="onChange">
    </van-image-preview>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  components: { Navi },
  name: "NoteDetail",
  data() {
    return {
      data: [],
      show: false,
      index: 0,
      count: 0,
      isLoading: false,
      list: [],
      banner: [],
      images: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getNoteItem(this.id);
  },
  methods: {
    viewUser(id) {
      // console.log(id);
      this.$router.push({ name: "User", params: { id } });
    },
    imgin(images) {
      this.images = [];
      images.forEach((element) => {
        this.images.push(element.u);
      });
      this.show = true;
      //   console.log(this.images);
    },
    onChange(index) {
      this.index = index;
    },
    getNoteItem(id) {
      this.axios({
        method: "get",
        url: "/note/detail/" + id,
      })
        .then((result) => {
          // console.log(result);
          if (result.data.state === "success") {
            this.data = result.data.result.note;
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
.content {
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding: 0 10px;
  overflow-y: auto;
  .user {
    margin-top: 10px;
    overflow: hidden;
    .van-image {
      float: left;
      margin-right: 10px;
    }
    .name {
      font-size: 14px;
      margin: 5px 0;
    }
    .time {
      color: #999;
    }
  }
  .cont {
    width: 355px;
    // height: 355px;
    overflow: hidden;
    .van-image {
      height: 100%;
      width: 100%;
    }
  }
  .user-said {
    padding: 0 10px;
    color: #333;
  }
  // background-color: #fff;
  .hot {
    position: absolute;
    top: 80px;
    right: 10px;
    color: #ff614c;
    font-size: 20px;
    transform: rotate(30deg);
  }
  .foot {
    margin: 5px 0;
    background-color: #eee;
    border-radius: 5px;
    .foot-item {
      overflow: hidden;
      .van-image {
        margin-top: 5px;
        float: left;
        margin-right: 5px;
        margin-left: 5px;
      }
      .csu {
        float: left;
        padding-right: 5px;
        color: rgb(122, 0, 133);
      }
      p {
        margin: 0;
        line-height: 32px;
      }
    }
  }
}
</style>