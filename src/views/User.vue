<template>
  <div class="user">
    <Navi :fixed="true" />
    <van-image width="100%" height="250px" fit="cover" :src="data.user_cover" />
    <div class="content">
      <div class="us">
        <van-image
          round
          width="80px"
          height="80px"
          fit="cover"
          :src="data.avatar_medium"
        />
        <h4 class="name">
          {{ data.nick }}
        </h4>

        <!-- recipes_count 菜谱 -->
        <!-- notes_count 笔记 -->
      </div>
      <div class="countbox">
        <div class="count">
          <span>菜谱 {{ data.recipes_count }}</span>
          <span>笔记 {{ data.notes_count }}</span>
          <span>粉丝 {{ data.followers_count_text }}</span>
        </div>
        <p>{{ data.introduction }}</p>
      </div>
      <van-tabs v-model="active" color="#ff8e4c" sticky>
        <van-tab title="简介">
          <div class="info">
            <h4>个人信息</h4>
            <p><span>用户等级</span> {{ data.lvl }}</p>
            <p><span>加入时间</span> {{ data.regist_time }}</p>
            <p><span>来自</span> {{ data.location }}</p>
          </div>
        </van-tab>
        <van-tab title="笔记">
          <div class="note-box">
            <van-list
              :finished="finished"
              finished-text="没有更多了"
              @load="getUserNoteMore"
            >
              <div
                class="note-item"
                v-for="(note, inde) in notes"
                :key="inde"
                @click="viewDetail(note.day_list[0].id)"
              >
                <div class="zheng">
                  <div class="note-time">
                    <span class="month">{{ note.month_text }}</span>
                    <span class="day">{{ note.day_text }}</span>
                  </div>

                  <van-grid
                    :column-num="
                      note.day_list[0].images.length < 2
                        ? 1
                        : note.day_list[0].images.length < 5
                        ? 2
                        : 3
                    "
                    :border="false"
                    square
                  >
                    <van-grid-item
                      v-for="(img, ind) in note.day_list[0].images"
                      :key="ind"
                    >
                      <van-image fit="cover" :src="img.u" />
                    </van-grid-item>
                  </van-grid>
                </div>

                <div class="othortit">
                  <p class="pp">{{ note.day_list[0].title }}</p>
                </div>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="菜谱">
          <div class="cipes">
            <van-list
              :finished="finished"
              finished-text="没有更多了"
              @load="getUserCipesMore"
            >
              <div class="cipe" v-for="(cipe, inde) in cipes" :key="inde">
                <h4>{{ cipe.r.n }}</h4>
                <van-image
                  fit="cover"
                  width="100%"
                  height="300px"
                  :src="cipe.r.img"
                  @click="detailItem(cipe.r.id)"
                />
                <p class="story" v-if="cipe.r.cookstory">
                  {{ cipe.r.cookstory }}
                </p>
                <span class="seeit"
                  ><van-icon name="eye-o" />{{ cipe.r.recommend_label }}</span
                >
              </div>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  name: "User",
  data() {
    return {
      id: null,
      active: 0,
      data: [],
      cipes: [],
      notes: [],
      loading: false,
      finished: false,
      ids: 0,
      idx: 0,
    };
  },
  components: {
    Navi,
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser(this.id);
    this.getUserNoteMore();
    this.getUserCipesMore();
  },
  methods: {
    detailItem(id) {
      // console.log(id)
      this.$router.push({ name: "Item", params: { id } });
    },
    viewDetail(id) {
      this.$router.push({ name: "NoteDetail", params: { id } });
    },
    onChange(index) {
      this.index = index;
    },
    getUser(id) {
      this.axios({
        method: "get",
        url: "/user/info/" + id,
      })
        .then((result) => {
          // console.log('result=>',result);
          if (result.data.state === "success") {
            this.data = result.data.result.user;
            // console.log(this.data);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },

    getUserNoteMore() {
      this.axios({
        method: "get",
        url: "/user/usernotescalendar/" + this.id + "/" + this.ids + "/10",
      })
        .then((result) => {
          // console.log("result=>", result);

          if (result.data.state === "success") {
            this.ids + 10;
            let nos = result.data.result.notes;
            nos.forEach((element) => {
              this.notes.push(element);
            });
            this.loading = false;
            // console.log(this.ids);
            if (this.notes.length < 1) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },

    getUserCipesMore() {
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/douguo/user/urecipes/" +
          this.id +
          "/" +
          this.idx +
          "/10",
      })
        .then((result) => {
          // console.log(result);
          if (result.data.state === "success") {
            this.idx++;
            result.data.result.list.forEach((ele) => {
              this.cipes.push(ele);
              // console.log(element.r.id)
            });
            // console.log(this.cipes);
            this.loading = false;
            if (this.cipes.length < 1) {
              this.finished = true;
            }
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
.user {
  /deep/.van-nav-bar {
    background-color: rgba(0, 0, 0, 0.1);

    &::after {
      border: none;
    }
    .van-icon {
      color: #fff;
    }
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  .bg {
    width: 100%;
    height: 250px;
    background-image: url(../assets/UserBG.jpg);
    background-position: center;
  }
  .content {
    position: absolute;
    border-radius: 15px;

    width: 100%;
    height: 500px;
    top: 200px;
    background-color: #eee;
    .us {
      position: relative;
      width: 100%;
      height: 50px;
      background-color: #fff;
      border-radius: 15px 15px 0 0;
      .van-image {
        position: absolute;
        top: -40px;
        left: 20px;
        border: 2px solid #fff;
      }
      .name {
        margin-left: 110px;
        margin-top: 0;
        padding-top: 10px;
      }
    }
    .countbox {
      padding: 0 10px;
      background-color: #fff;
      P {
        margin-bottom: 0;
        padding-bottom: 10px;
      }
      span {
        margin-right: 5px;
      }
    }
    .note-item {
      margin: 10px 10px;
      background-color: #fff;
      overflow: hidden;
      border-radius: 0 5px 5px 5px;
      .zheng {
        overflow: hidden;
      }
    }
    .note-time {
      float: left;
      width: 14%;
      font-weight: 600;
      border-left: 3px solid #ff6e4c;
      height: 100%;
      .month {
        font-size: 16px;
      }
    }
    .van-grid {
      float: right;
      width: 85%;
    }
  }

  .pp {
    margin-left: 60px;
    color: #666;
  }

  .info {
    background-color: #fff;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    span {
      color: #999;
    }
  }
  .note-box {
    background-color: #eee;
  }
  .cipes {
    margin: 10px 0;
    padding: 0 10px;
    background-color: #eee;
    .cipe {
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      margin: 10px 0;
      background-color: #fff;
      h4 {
        margin-left: 10px;
      }
      .story {
        color: #999;
        padding: 0 10px;
      }
      .seeit {
        float: right;
        color: #999;
      }
    }
  }
}
</style>