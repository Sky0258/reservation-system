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
    <div id="demo" style="width: 700px; float: left; margin-top: 10px">
      <ul class="list">
        <li
          v-for="(item, index) in ulList"
          :key="item.id"
          :class="!index && play ? 'toUp' : ''"
        >
          <el-tag type="warning" style="height: 22px; line-height: 22px">{{
            item.title
          }}</el-tag>
          {{ item.content }}
        </li>
      </ul>
    </div>
    <div class="right">
      <router-link to="/login" @click="logout">退出登录</router-link>
      <span class="one">{{ "欢迎你，" + this.userInfo.data.username }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ulList: [
        {
          title: "",
          content: "",
        },
      ],
      play: false,
    };
  },
  mounted() {
    setInterval(this.startPlay, 5000);
    this.$store
      .dispatch("allNotice", {
        pageNum: 1,
        pageSize: 100,
      })
      .then(() => {
        this.ulList = this.allNotice.data.list;
      })
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    logout() {
      alert("!1111111111");
      this.$store
        .dispatch("userLogout", {
          Authorization: this.token,
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    startPlay() {
      let that = this;
      that.play = true; //开始播放
      setTimeout(() => {
        that.ulList.push(that.ulList[0]); //将第一条数据塞到最后一个
        that.ulList.shift(); //删除第一条数据
        that.play = false; //暂停播放
      }, 500);
    },
  },
  computed: {
    ...mapGetters(["token", "userInfo", "allNotice"]),
    breadCrumbList() {
      return this.$route.matched;
    },
    text() {
      return {
        id: this.number,
        val: this.textArr[this.number],
      };
    },
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
.toUp {
  margin-top: -40px;
  transition: all 0.5s linear;
  transform: translateY(-20px) scale(0.8);
  opacity: 0;
}

.list {
  list-style: none;
  width: 700px;
  text-align: center;
  overflow: hidden;
  height: 40px;
  padding: 0;
  margin: 0;
}
li {
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #e0e0e0;
  font-family: "宋体";
  font-weight: 500;
  font-size: 15px;
}
</style>