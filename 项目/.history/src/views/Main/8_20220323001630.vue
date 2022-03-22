<template>
  <div>
    <el-carousel
      type="card"
      :autoplay="false"
      ref="carousel"
      arrow="always"
      trigger="click"
      height="150px"
      style="margin-bottom: 5px"
    >
      <el-carousel-item
        v-for="(item, index) in allSiteList"
        :key="item.index"
        style="width: 350px; margin-left: 85px; height: 150px"
      >
        <img
          :src="item.imgUrl"
          style="margin: 0px; width: 350px; height: 150px"
        />
      </el-carousel-item>
    </el-carousel>
    <el-tabs type="border-card" v-model="day">
      <el-tab-pane :label="day1" v-model="day">
        <div>
          <el-radio-group v-model="radio1">
            <el-radio-button
              class="contain"
              v-for="city in cities"
              :disabled="result(city, day1, radioA)"
              :label="city"
              :key="city"
              >{{ city }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio
            v-model="radioA"
            :label="item.id"
            v-for="(item, index) in allSiteList"
            :key="item.index"
            @change="showstep(item)"
            >{{ item.name }}</el-radio
          >
          <el-button
            type="primary"
            plain
            style="float=right"
            @click="show"
            >提交预约</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane :label="day2">
        <div>
          <el-radio-group v-model="radio2">
            <el-radio-button
              :disabled="result(city, day2, radioA)"
              class="contain"
              v-for="city in cities"
              :label="city"
              :key="city"
              >{{ city }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio
            v-model="radioA"
            :label="item.id"
            v-for="(item, index) in allSiteList"
            :key="item.index"
            @change="showstep(item.name.substr(3) - 1)"
            >{{ item.name }}</el-radio
          >
          <el-button
            type="primary"
            plain
            style="float=right"
            @click="show"
            >提交预约</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane :label="day3">
        <div>
          <el-radio-group v-model="radio3">
            <el-radio-button
              class="contain"
              v-for="city in cities"
              :disabled="result(city, day3, radioA)"
              :label="city"
              :key="city"
              >{{ city }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio
            v-model="radioA"
            :label="item.id"
            v-for="(item, index) in allSiteList"
            :key="item.index"
            @change="showstep(item.name.substr(3) - 1)"
            >{{ item.name }}</el-radio
          >
          <el-button
            type="primary"
            @click="show"
            plain
            style="float=right"
            >提交预约</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="预约信息" :visible.sync="dialogVisible" width="30%">
      <el-descriptions :column="1" style="margin-top:-15px">
        <el-descriptions-item label="用户id">{{this.userInfo.data.userId}}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{this.userInfo.data.username}}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{this.messageTime}}</el-descriptions-item>
        <el-descriptions-item label="预约场地">
          <el-tag size="small">{{this.num}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-button @click="dialogVisible = false" style="margin-top: 15px;margin-right: 20px">取 消</el-button>
      <el-button type="primary" @click="submitForm1('ruleForm1')" style="margin-top: 15px">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = [
  "08:00 ~ 09:00",
  "09:00 ~ 10:00",
  "10:00 ~ 11:00",
  "11:00 ~ 12:00",
  "12:00 ~ 13:00",
  "13:00 ~ 14:00",
  "14:00 ~ 15:00",
  "15:00 ~ 16:00",
  "16:00 ~ 17:00",
  "17:00 ~ 18:00",
  "18:00 ~ 19:00",
  "19:00 ~ 20:00",
  "20:00 ~ 21:00",
  "21:00 ~ 22:00",
];
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      day: 0,
      day1: this.ShowDate(0),
      day2: this.ShowDate(-1),
      day3: this.ShowDate(-2),
      cities: cityOptions,
      checkboxGroup1: ["上海"],
      radioA: 1,
      radio1: "07:00 ~ 09:00",
      radio2: "07:00 ~ 09:00",
      radio3: "07:00 ~ 09:00",
      img1: "",
      dialogVisible: false,
      messageTime:"",
      num:"篮球场1",
      allSiteList:""
    };
  },
  mounted() {
    let data = {
      pageNum: 1,
      pageSize: 100,
    };
    let userId = this.userInfo.data.userId;
    let categoryId = 0;
    this.$store
      .dispatch("allSite", {
        userId,
        categoryId,
        data,
      })
      .then(() => {
        this.radioA = this.allSite.data.list[0].id;
        this.allSiteList = this.allSite.data.list;
        this.$store
          .dispatch("orderedSite", {
            categoryId: 0,
            userId: this.userInfo.data.userId,
          })
          .then(() => {
          })
          .catch(() => {
            this.$message.error("提取错误");
          });
      })
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    // showstep(ind) {
    //   console.log("22122222222221")
      // console.log(ind);
      // this.$refs.carousel.setActiveItem(ind);
      // this.num = '篮球场' + (ind + 1).toString();
    // },
    show(){
      this.dialogVisible = true;
      let endedTime1, startedTime1;
      if (this.day == 0) {
        endedTime1 = this.ShowDate(0) + " " + this.time1[1] + ":00";
        startedTime1 = this.ShowDate(0) + " " + this.time1[0] + ":00";
      } else if (this.day == 1) {
        endedTime1 = this.ShowDate(-1) + " " + this.time2[1] + ":00";
        startedTime1 = this.ShowDate(-1) + " " + this.time2[0] + ":00";
      } else {
        endedTime1 = this.ShowDate(-2) + " " + this.time3[1] + ":00";
        startedTime1 = this.ShowDate(-2) + " " + this.time3[0] + ":00";
      }
      this.messageTime = '' + startedTime1 + ' ~ ' + endedTime1.substr(11,12);
    },
    result(city, day, radio) {
      let date = new Date();
      let hour = date.getHours();
      let a = city.substr(0, 5) + ":00";
      let b = city.substr(8, 10) + ":00";
      let c = "" + day + " " + a;
      let d = "" + day + " " + b;
      if(day == this.ShowDate(0)){
          let time = city.substr(8, 10);
          let time1 = time.substr(0,2);
          if(hour >= time1){
            a = 1;
          }
      }
      for (let index in this.ordered.data) {
        if (
          c == this.ordered.data[index].startedTime &&
          d == this.ordered.data[index].endedTime &&
          radio == this.ordered.data[index].siteId
        ) {
          a = 1;
          break;
        }
      }
      if (a == 1) return true;
      else return false;
    },
    submitForm1(formName) {
      let endedTime1, startedTime1;
      if (this.day == 0) {
        endedTime1 = this.ShowDate(0) + " " + this.time1[1] + ":00";
        startedTime1 = this.ShowDate(0) + " " + this.time1[0] + ":00";
      } else if (this.day == 1) {
        endedTime1 = this.ShowDate(-1) + " " + this.time2[1] + ":00";
        startedTime1 = this.ShowDate(-1) + " " + this.time2[0] + ":00";
      } else {
        endedTime1 = this.ShowDate(-2) + " " + this.time3[1] + ":00";
        startedTime1 = this.ShowDate(-2) + " " + this.time3[0] + ":00";
      }
      this.messageTime = '' + startedTime1 + ' ~ ' + endedTime1.substr(11,12);
      let siteName1 = this.num;
      let userId = this.userInfo.data.userId;
      let data = {
        endedTime: endedTime1,
        siteId: this.radioA,
        siteName: siteName1,
        startedTime: startedTime1,
        userId: userId,
        username: this.userInfo.data.username,
      };
      this.$store
        .dispatch("orderSite", { userId, data })
        .then(() => {
          this.$message({
            type: "success",
            message: "预约成功!",
          });
        })
        .catch(() => {
          this.$message.error("当前时间段该场地已超时，无法预约");
        });
        this.dialogVisible = false;
    },
    ShowDate(date) {
      var num = date;
      let n = num;
      let d = new Date();
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() - n);
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      let s =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day < 10 ? "0" + day : day);
      return s;
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allSite", "ordered"]),
    time1: function () {
      return this.radio1.split(" ~ ");
    },
    time2: function () {
      return this.radio2.split(" ~ ");
    },
    time3: function () {
      return this.radio3.split(" ~ ");
    },
  },
};
</script>

<style scoped>
.images {
  height: 180px;
  /* border: 1px solid #e0e0e0; */
}
.images img {
  width: 250px;
  height: 150px;
  margin: 10px 40px;
}
.contain {
  margin: 15px 10px;
}
.el-radio-button:first-child >>> .el-radio-button__inner {
  border-left: 1px solid #dcdfe6;
}
.el-radio-button >>> .el-radio-button__inner {
  border: 1px solid #dcdfe6;
  width: 120px;
  height: 55px;
  font-size: 15px;
  line-height: 30px;
  border-radius: 10px;
  padding-left: 13px;
}
.ground {
  margin: 15px 30px;
  text-align: left;
  line-height: 30px;
}
.el-button--primary.is-plain {
  float: right;
  margin-right: 0px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>