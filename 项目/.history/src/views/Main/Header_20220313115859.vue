<template>
  <div class="box">
    <div class="left">高校运动场地预约系统</div>
    <div class="middle">
      <el-breadcrumb separator-class="el-icon-arrow-right" id="two">
        <el-breadcrumb-item
          v-for="breadCrumbItem in breadCrumbList"
          :key="breadCrumbItem.path"
          :to="{ path: breadCrumbItem.path }"
          >{{ breadCrumbItem.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="textBox">
      <transition name="slide">
        <p class="text" :key="text.id">{{text.val}}</p>
      </transition>
    </div>
    <div class="right">
      <router-link to="/login" @click="logout()">退出登录</router-link>
      <span class="one">{{ "欢迎你，" + this.userInfo.data.username }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data () {
    return {
      textArr: [
        '1 第一条公告',
        '2 第二条公告第二条公告',
        '3 第三条公告第三条公告第三条公告'
      ],
      number: 0
    }
  },
  mounted() {
    console.log(this.$route.matched);
    this.startMove();
  },
  methods: {
    logout() {
      this.$store.dispatch("userLogout", {
        Authorization: this.token,
      });
    },
    startMove () {
      // eslint-disable-next-line
      let timer = setTimeout(() => {
        if (this.number === 2) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
    }
  },
  computed: {
    ...mapGetters(["token", "userInfo"]),
    breadCrumbList() {
      return this.$route.matched;
    },
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
    text () {
      return {
        id: this.number,
        val: this.textArr[this.number]
      }
    }
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
  line-height: 67px;
  margin-left: 15px;
  font-size: 14px;
}
/* .middle >>> .el-breadcrumb >>> .el-breadcrumb__inner >>> .is-link {
    color: green;
} */
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: gainsboro;
  font-weight: 300;
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