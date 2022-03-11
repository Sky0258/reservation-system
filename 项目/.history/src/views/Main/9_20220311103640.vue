<template>
  <div>
    <el-carousel type="card" :autoplay="false" ref="carousel"
        arrow="always"
        trigger="click" height="150px" style="margin-bottom: 5px">
    <el-carousel-item  v-for="(item, index) in allSite.data.list"
          :key="item.index"
          style="width: 350px; margin-left: 82px;height: 150px">
      <img :src="item.imgUrl" style="margin: 0px;width: 350px;height: 150px">
    </el-carousel-item>
  </el-carousel>
    <el-tabs type="border-card" v-model="day">
      <el-tab-pane :label="day1" v-model="day">
        <div>
          <el-radio-group v-model="radio1">
            <el-radio-button
              :disabled="result(city,day1,radioA)"
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
            v-for="(item, index) in allSite.data.list"
            :key="item.index"
            @change="showstep(item.name.substr(4) - 1)"
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
              :disabled="result(city,day2,radioA)"
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
            v-for="(item, index) in allSite.data.list"
            :key="item.index"
            @change="showstep(item.name.substr(4) - 1)"
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
              :disabled="result(city,day3,radioA)"
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
            v-for="(item, index) in allSite.data.list"
            :key="item.index"
            @change="showstep(item.name.substr(4) - 1)"
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
      <el-descriptions column='1' style="margin-top:-15px">
        <el-descriptions-item label="用户id">{{this.userInfo.data.userId}}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{this.userInfo.data.username}}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{this.messageTime}}</el-descriptions-item>
        <el-descriptions-item label="预约场地" style="margin-top: 50px">
          <el-tag size="medium">{{this.num}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-button @click="dialogVisible = false" style="margin-top: 15px;margin-right: 20px">取 消</el-button>
      <el-button type="primary" @click="submitForm1('ruleForm1')" style="margin-top: 15px">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = [
  "07:00 ~ 09:00",
  "09:00 ~ 11:00",
  "11:00 ~ 13:00",
  "13:00 ~ 15:00",
  "15:00 ~ 17:00",
  "17:00 ~ 19:00",
  "19:00 ~ 21:00",
  "21:00 ~ 23:00",
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
      radioA: 9,
      radio1: "07:00 ~ 09:00",
      radio2: "07:00 ~ 09:00",
      radio3: "07:00 ~ 09:00",
      img1: "",
      nowDay:"",
      nowDay1:"",
      dialogVisible:false,
      messageTime:"",
      num:""
    };
  },
  mounted() {
    let data = {
      pageNum: 1,
      pageSize: 100,
    };
    let userId = this.userInfo.data.userId;
    let categoryId = 1;
    this.$store
      .dispatch("allSite", {
        userId,
        categoryId,
        data,
      })
      .then(() => {
        this.$store
          .dispatch("orderedSite", {
            categoryId: 1,
            userId: this.userInfo.data.userId
          })
          .then(() => {
            console.log(this.ordered);
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
    top(a){
      console.log(a);
    },
    showstep(ind) {
      this.$refs.carousel.setActiveItem(ind);
      this.num = '羽毛球场' + (ind + 1);
      console.log(this.num);
    },
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
    result(city,day,radio) {
      let a = city.substr(0,5) + ':00';
      let b = city.substr(8,10) + ':00';
      let c = '' + day + ' ' + a;
      let d = '' + day + ' ' + b;
      for(let index in this.ordered.data){
        if(c == this.ordered.data[index].startedTime && d == this.ordered.data[index].endedTime && radio == this.ordered.data[index].siteId){
          a = 1;
          break;
        }
      }
      if(a == 1)
        return true;
      else
        return false;
    },
    submitForm1(formName) {
      let endedTime1, startedTime1;
      if (this.day == 0) {
        endedTime1 = this.ShowDate(0) + " " + this.time1[1] + ":00";
        startedTime1 = this.ShowDate(0) + " " + this.time1[0] + ":00";
        console.log(startedTime1);
        console.log(endedTime1);
      } else if (this.day == 1) {
        endedTime1 = this.ShowDate(-1) + " " + this.time2[1] + ":00";
        startedTime1 = this.ShowDate(-1) + " " + this.time2[0] + ":00";
        console.log(startedTime1);
        console.log(endedTime1);
      } else {
        endedTime1 = this.ShowDate(-2) + " " + this.time3[1] + ":00";
        startedTime1 = this.ShowDate(-2) + " " + this.time3[0] + ":00";
        console.log(startedTime1);
        console.log(endedTime1);
      }
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
            message: "提交成功!",
          });
          result(this.radio1,this.day1,radioA)  
        })
        .catch(() => {
          this.$message.error("当前时间段该场地已经有预约");
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
    time4: function(){
      return this.nowDay.split(" ");
    },
    time5: function(){
      return this.nowDay1.split(" ");
    }
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
  margin: 15px 30px;
}
.el-radio-button:first-child >>> .el-radio-button__inner {
  border-left: 1px solid #dcdfe6;
}
.el-radio-button >>> .el-radio-button__inner {
  border: 1px solid #dcdfe6;
  width: 150px;
  height: 55px;
  font-size: 17px;
  line-height: 30px;
  border-radius: 10px;
}
.ground {
  margin: 15px 50px;
  text-align: left;
  line-height: 30px;
}
.el-button--primary.is-plain {
  float: right;
  margin-right: 70px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>