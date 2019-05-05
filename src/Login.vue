
<template>
  <div>
    <el-input v-model="user" placeholder="请输入内容"></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button v-on:click="login">登陆</el-button>
    <el-button v-on:click="register">注册</el-button>
  </div>
</template>

<script>
import api from "./config/api";
export default {
  name: "login",
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.axios
        .post(
          `${api}/login`,
          { user: this.user, password: this.password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.token
            }
          }
        )
        .then(response => {
          if (response.data.code == 0) {
            localStorage.token = response.data.token;
            localStorage.islogin = 1;
            window.location.href='/'
          } else {
            this.$message.error(response.data.msg);
          }
        });
      // console.log(this.user);
    },
    register() {
      this.axios
        .post(
          `${api}/register`,
          { user: this.user, password: this.password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.token
            }
          }
        )
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            localStorage.token = response.data.token;
            localStorage.islogin = 1;
            window.location.href='/'
          } else {
            this.$message.error(response.data.msg);
          }
        });
    }
  }
};
</script>