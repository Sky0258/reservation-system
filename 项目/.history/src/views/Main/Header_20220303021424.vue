<template>
  <div class="box">
    <div class="left">高校运动场地预约系统</div>
    <div class="middle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <router-link to="/login" @click="logout()">退出登录</router-link>
      <span class="one">{{ "欢迎你，" + this.userInfo.data.username }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    logout() {
      this.$store.dispatch("userLogout", {
        Authorization: this.token,
      });
    },
  },
  computed: {
    ...mapGetters(["token", "userInfo"]),
  },
};
</script>

<style scoped>
.box .left {
  color: white;
  float: left;
  font-size: 22px;
  font-weight: 800;
  line-height: 60px;
  margin-left: -10px;
}
.box .right {
  float: right;
  height: 60px;
  line-height: 60px;
}
.box .middle {
    float: left;
}
.box .middle >>> .el-breadcrumb {
    line-height: 60px;
    margin-left: 10px;
}
.right i {
  float: right;
  display: block;
  width: 30px;
  height: 30px;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  color: #1f9ffe;
  font-weight: 200;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  margin-top: 13px;
  margin-right: 13px;
  background-color: #e0e0e0;
}
.right a {
  float: right;
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
}
.one {
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
  margin-right: 20px;
}
</style>