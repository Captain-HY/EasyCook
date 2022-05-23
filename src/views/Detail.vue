
<template>
  <div class="detail">
    <Navi :title="keyword" :fixed="true" />

    <div>
      <div class="all-detail">
        <div
          class="items"
          v-for="(item, index) in productDatail"
          :key="index"
          @click="detailItem(item.id)"
        >
          <div>
            <img class="item-img" v-if="item" :src="item.img" alt="" />
            <div class="item-author" v-if="item">
              <p class="title">
                {{ item.n }}
              </p>
              <div class="author">
                <img class="author-img" :src="item.a.p" alt="" />
                <span class="author-tit">
                  {{ item.an }}
                </span>
              </div>

              <span class="doi">
                {{ item.recommendation_tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  name: "Detail",
  data() {
    return {
      count: 1,
      keyword: "",
      productDatail: [],
      showitem: false,
      // deta: [],
    };
  },
  components: {
    Navi,
  },
  created() {
    this.keyword = this.$route.params.name;
    this.getProductDetailByName(this.keyword);
  },
  methods: {
    getProductDetailByName(keyword) {
      this.axios({
        method: "get",
        url: "/recipe/search",
        params: {
          keyword,
        },
      })
        .then((result) => {
          //   console.log(result);
          if (result.data.state === "success") {
            let data = result.data.result.list;
            data.forEach((element) => {
              if (element.r != undefined) {
                this.productDatail.push(element.r);
              }
            });

            // console.log("pro", this.productDatail);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    detailItem(id) {
      // console.log(id)
      this.$router.push({ name: "Item", params: { id } });
    },
  },

};
</script>

<style lang="less" >
.detail {
  .all-detail {
    margin-top: 50px;

    .items {
      width: 97%;
      //   height: 230px;
      position: relative;
      margin-left: 5px;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      float: left;
      background-color: #fff;
      //   box-shadow:  0 2px 3px 0 rgba(0, 0, 0, 0.3);

      .item-author {
        // position: absolute;
        // bottom: 10px;
        // right: 10px;
        font-size: 16px;
        font-weight: 400;
        color: #333;
        // background: rgba(0, 0, 0, 0.514);
        .author {
          float: left;
          .author-img {
            width: 30px;
            height: 30px;
            display: block;
            float: left;
          }
          .author-tit {
            color: #666;
            line-height: 30px;
            font-size: 14px;
          }
        }
        .doi {
          float: right;
          color: #666;
          font-size: 14px;
          line-height: 30px;
        }
      }
      .item-img {
        width: 100%;
        margin: 0 auto;
        height: 230px;
      }
    }
  }
  .con-tit {
    padding-left: 10px;
  }
  .content {
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
}
</style>