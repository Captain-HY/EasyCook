<template>
  <div class="note">
    <div class="cont">
      <div class="list">
        <van-list :finished="finished" finished-text="没有更多了" @load="getNote">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div v-if="item.note">
              <div class="item-user" @click="viewDetail(item.note.id)">
                <van-image round width="50px" height="50px" fit="cover" :src="item.note.author.p" />
                <p>{{ item.note.author.n }}</p>
                <p class="time">{{ item.note.publishtime }}</p>
              </div>

              <div class="content">
                <van-grid :column-num="
                  item.note.images.length < 2
                    ? 1
                    : item.note.images.length < 5
                      ? 2
                      : 3
                " :border="false" square>
                  <van-grid-item v-for="(img, ind) in item.note.images" :key="ind">
                    <van-image fit="cover" :src="img.u" @click="imgin(item.note.images)" />
                  </van-grid-item>
                </van-grid>
                <div class="user-said" @click="viewDetail(item.note.id)">
                  <p>{{ item.note.title }}</p>
                  <div>
                    <span>{{ item.note.like_count }}
                      <van-icon name="like-o" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <van-image-preview v-model="show" :images="images" @change="onChange">
    </van-image-preview>
  </div>
</template>

<script>
export default {
  name: "Note",

  data() {
    return {
      show: false,
      index: 0,
      count: 0,
      isLoading: false,
      finished: false,
      list: [],
      images: [],
      ids: 0,
    };
  },
  created() {
    this.getNote();
  },
  methods: {
    viewDetail(id) {
      this.$router.push({ name: "NoteDetail", params: { id } });
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
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    getNote() {
      this.axios({
        method: "get",
        url: "/home/notes/" + this.ids + "/5",
      })
        .then((result) => {
          //   console.log(result);
          if (result.data.state === "success") {
            //   console.log(result.data.result)
            this.ids += 5;
            result.data.result.list.forEach((element) => {
              this.list.push(element);
            });
            // console.log(this.list);
            this.loading = false;
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
.note {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;

  .list {
    width: 100%;

    .item {
      margin: 5px 10px;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;

      .item-user {
        margin-top: 10px;
        overflow: hidden;

        .van-image {
          float: left;
          margin: 0 10px;
        }

        .time {
          color: #999;
        }
      }

      .content {
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
        color: #666;
      }
    }
  }
}
</style>