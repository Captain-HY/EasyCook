<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <div class="left-box">
          <div class="logo">
            <img class="auto-img" src="../assets/bg.jpg" alt="" />
          </div>
          <div class="logo-text">轻厨</div>
        </div>
      </template>
      <template #right>
        <div class="home-text" @click="goPage('Home')">首页</div>
      </template>
    </van-nav-bar>
    <div class="login-box">
      <div class="welcome-title">你又来学做菜啦~</div>
      <div class="welcome-subtitle">Please login to your accounts</div>

      <div class="form-box">
        <van-form>
          <van-field v-model="loginUserInfo.phone" name="手机号" label="手机号" placeholder="手机号" autocomplete="off" />
          <van-field v-model="loginUserInfo.password" :type="!isOpenLogin ? 'password' : 'text'" name="密码" label="密码"
            placeholder="密码" :right-icon="!isOpenLogin ? 'closed-eye' : 'eye-o'" autocomplete="off"
            @click-right-icon="toggleLoginPasssword" />
          <div class="forgot">
            <div class="forgot-pwd">忘记密码？</div>
          </div>
          <div class="login-btn">
            <van-button round block color="#ff6e4c" @click="login">登录</van-button>
          </div>
          <div class="login-btn">
            <van-button round block type="default" @click="showPopup">注册</van-button>
          </div>
        </van-form>
      </div>
    </div>

    <!-- 注册 -->
    <van-popup v-model="show" position="bottom" closeable>
      <div class="register-box">
        <div class="register-title">注册</div>
        <van-form>
          <van-field v-model="registerUserInfo.phone" name="手机号" label="手机号" placeholder="手机号" autocomplete="off" />
          <van-field v-model="registerUserInfo.password" :type="!isOpenRegister ? 'password' : 'text'" name="密码"
            label="密码" placeholder="密码" :right-icon="!isOpenRegister ? 'closed-eye' : 'eye-o'" autocomplete="off"
            @click-right-icon="toggleResgiterPasssword" />
          <van-field v-model="registerUserInfo.nickName" type="text" name="昵称" label="昵称" placeholder="昵称"
            autocomplete="off" />

          <div class="login-btn">
            <van-button round block color="#ff6e4c" @click="register">注册</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      //是否显示注册弹窗
      show: false,
      loginUserInfo: {
        phone: "",
        password: "",
      },
      registerUserInfo: {
        phone: "",
        password: "",
        nickName: "",
      },

      //查看注册密码
      isOpenRegister: false,

      //查看登录密码
      isOpenLogin: false,
    };
  },

  methods: {
    showPopup() {
      this.show = !this.show;
    },

    //查看首页
    goPage(name) {
      this.$router.push({ name });
    },

    //切换注册密码可见状态
    toggleResgiterPasssword() {
      this.isOpenRegister = !this.isOpenRegister;
    },

    //切换登录密码可见状态
    toggleLoginPasssword() {
      this.isOpenLogin = !this.isOpenLogin;
    },

    //注册
    register() {
      if (!this.registerUserInfo.phone) {
        Toast.fail("请填写手机号码");
        return;
      } else if (!this.registerUserInfo.password) {
        Toast.fail("请填写密码");
        return;
      } else if (!this.registerUserInfo.nickName) {
        Toast.fail("请填写昵称");
        return;
      } else {
        let userInfo = {
          phone: this.registerUserInfo.phone,
          password: this.registerUserInfo.password,
          nickname: this.registerUserInfo.nickName,
        };
        localStorage.setItem("saveUserInfo", JSON.stringify(userInfo));
        Toast.success("注册成功");
        this.show = !this.show;
      }
    },
    login() {
      if (!this.registerUserInfo.phone) {
        Toast.fail("请先注册");
        return;
      }
      let lastUserInfo = JSON.parse(localStorage.getItem("saveUserInfo"));

      if (!this.loginUserInfo.phone || this.loginUserInfo.phone == "") {
        Toast.fail("请填写手机号码");
        return;
      } else if (
        !this.loginUserInfo.password ||
        this.loginUserInfo.password == ""
      ) {
        Toast.fail("请填写密码");
        return;
      } else if (this.loginUserInfo.phone != lastUserInfo.phone) {
        Toast.fail("请正确填写手机号");
        return;
      } else if (this.loginUserInfo.password != lastUserInfo.password) {
        Toast.fail("请正确填写密码");
        return;
      } else {
        setTimeout(() => {
          this.$router.push({ name: "Home" });

        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #ffb4887e;

  .register-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .register-box {
    padding: 10px;
  }

  .forgot {
    margin-top: 20px;
    display: flex;
  }

  .forgot-pwd {
    margin-left: auto;
    font-size: 14px;
    color: #666;
  }

  .login-btn {
    margin-top: 50px;
  }

  .form-box {
    margin-top: 50px;
  }

  .welcome-title {
    font-size: 30px;
    color: #ff6e4c;
  }

  .welcome-subtitle {
    font-size: 18px;
    margin-top: 20px;
    color: #999;
  }

  .login-box {
    margin-top: 80px;
    padding: 10px;
  }

  .home-text {
    color: #ff6e4c;
    font-weight: bold;
    font-size: 14px;
  }

  .left-box {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .logo-text {
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
    line-height: 50px;
    color: #ff6e4c;
  }
}
</style>