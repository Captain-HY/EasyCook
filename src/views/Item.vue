<template>
  <div class="Item box">
    <Navi :fixed="true" />
    <div>
      <div class="product">
        <van-image
          width="100%"
          height="300px"
          fit="cover"
          :src="detail.photo_path"
        />
        <div class="content">
          <h2>{{ detail.title }}</h2>
          <div
            v-if="detail.user"
            class="user"
            @click="viewUser(detail.user.user_id)"
          >
            <van-image
              round
              class="user-img"
              width="50px"
              height="50px"
              fit="cover"
              :src="detail.user.avatar_medium"
            />
            <div class="username">
              {{ detail.user.nickname }}
            </div>
            <div class="view-count">
              {{ detail.views_count_text
              }}<van-icon color="#ff8e4c" name="fire" />
            </div>
          </div>
          <p class="cookstoty" v-if="detail.cookstory">
            {{ detail.cookstory }}
          </p>
          <div class="cook-icon">
            <div class="cook-pan" v-if="detail.cook_time">
              <img src="../assets/pan.png" alt="" />
              <p>{{ detail.cook_time }}</p>
            </div>
            <div class="cook-differ" v-if="detail.cook_difficulty_text">
              <img src="../assets/zhong.png" alt="" />
              <p>{{ detail.cook_difficulty_text }}</p>
            </div>
            <div class="cook-count">
              <img src="../assets/cheng.png" alt="" />
              <p>{{ cookcount }}样</p>
            </div>
          </div>
          <div class="detail">
            <van-tabs v-model="activeName" color="#ff814c" sticky animated>
              <van-tab name="a" title="食材">
                <div
                  class="major"
                  v-for="(items, indexs) in detail.major"
                  :key="indexs"
                >
                  <div class="cont-left">{{ items.title }}</div>
                  <div class="cont-right">{{ items.note }}</div>
                </div>
              </van-tab>
              <van-tab name="b" title="步骤">
                <div
                  class="cookstep"
                  v-for="(item, index) in detail.cookstep"
                  :key="index"
                >
                  <div class="cookstep-item">
                    <p class="item-tit">
                      <span class="icolor">{{ item.position }}</span
                      >/{{ laststep }}
                    </p>
                    <van-image
                      width="100%"
                      height="300px"
                      fit="cover"
                      :src="item.image"
                    />
                    <span class="icontent">{{ item.content }}</span>
                  </div>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  name: "Item",
  data() {
    return {
      id: "",
      detail: [],
      activeName: 0,
      laststep: null,
      cookcount: 0,
    };
  },
  components: {
    Navi,
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetailById(this.id);
  },
  methods: {
    viewUser(id) {
      // console.log(id);
      this.$router.push({ name: "User", params: { id } });
    },
    getDetailById(id) {
      this.axios({
        method: "get",
        url: "/recipe/detail/" + id,
      })
        .then((result) => {
          // console.log("result->", result);
          if (result.data.state === "success") {
            this.detail = result.data.result.recipe;
            // console.log(this.detail.cookstep);
            this.cookcount = result.data.result.recipe.major.length;
            this.detail.cookstep.forEach((element) => {
              this.laststep = element.position;
            });
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
.box {
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
  .product {
    width: 100%;
    position: relative;
    .product-img {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .content {
      position: absolute;
      top: 250px;
      // left: 5px;
      background-color: #fff;
      width: 100%;
      //   height: 1000px;
      border-radius: 30px 30px 0 0;
      padding-top: 10px;

      h2 {
        padding: 0 10px;
      }
      .user {
        width: 100%;
        overflow: hidden;
        .user-img {
          margin-left: 20px;
          float: left;
        }
        .username {
          line-height: 50px;
          float: left;
          margin-left: 10px;
          font-size: 18px;
        }
        .view-count {
          float: right;
          line-height: 50px;
          margin-right: 10px;
          font-size: 16px;
          color: #999;
        }
      }
      .cookstoty {
        padding: 0 10px;
      }
      .detail {
        margin-block: 10px;
        .major {
          width: calc(100% -20px);
          height: 20px;
          padding: 5px 10px 5px;
          font-size: 16px;
          .cont-left {
            float: left;
          }
          .cont-right {
            float: right;
          }
          &:nth-child(2n) {
            background-color: rgb(230, 230, 230);
          }
        }
        .cookstep {
          //   width: calc(100% -20px);
          padding: 5px 10px 0;
          font-size: 16px;
          .cookstep-item {
            .icolor {
              color: #ff8e4c;
            }
            .icontent {
              color: #666;
            }
          }
        }
      }
      .cook-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          // margin: 0 10px;
          text-align: center;
          flex: 1;
          p {
            margin-top: 5px;
            margin-bottom: 5px;
          }
        }
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>