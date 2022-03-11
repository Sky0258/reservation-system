<template>
  <div>
    <div class="images">
      <!-- <img src="./images/篮球场1.jpg" alt="" />
      <img src="./images/篮球场2.jpg" alt="" />
      <img src="./images/篮球场3.jpg" alt="" /> -->
      <el-carousel :interval="10000" type="card" height="150px">
        <el-carousel-item v-for="item in allSite" :key="item">
          <img src="./images/篮球场1.jpg" alt="">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane :label="day1">
        <div>
          <el-radio-group v-model="radio1">
            <el-radio-button
              class="contain"
              v-for="city in cities"
              :label="city"
              :key="city"
              >{{ city }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio v-model="radioA" label="1">篮球场地1</el-radio>
          <el-radio v-model="radioA" label="2">篮球场地2</el-radio>
          <el-radio v-model="radioA" label="3">篮球场地3</el-radio>
          <el-radio v-model="radioA" label="4">篮球场地4</el-radio>
          <el-button
            type="primary"
            plain
            style="float=right"
            @click="submitForm1('ruleForm1')"
            >提交预约</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane :label="day2">
        <div>
          <el-radio-group v-model="radio2">
            <el-radio-button
              class="contain"
              v-for="city in cities"
              :label="city"
              :key="city"
              >{{ city }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio v-model="radioB" label="1">篮球场地1</el-radio>
          <el-radio v-model="radioB" label="2">篮球场地2</el-radio>
          <el-radio v-model="radioB" label="3">篮球场地3</el-radio>
          <el-radio v-model="radioB" label="4">篮球场地4</el-radio>
          <el-button
            type="primary"
            plain
            style="float=right"
            @click="submitForm1('ruleForm1')"
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
              :label="city"
              :key="city"
              >{{ city }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio v-model="radioC" label="1">篮球场地1</el-radio>
          <el-radio v-model="radioC" label="2">篮球场地2</el-radio>
          <el-radio v-model="radioC" label="3">篮球场地3</el-radio>
          <el-radio v-model="radioC" label="4">篮球场地4</el-radio>
          <el-button
            type="primary"
            @click="submitForm1('ruleForm1')"
            plain
            style="float=right"
            >提交预约</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const cityOptions = [
  "7:00 ~ 9:00",
  "9:00 ~ 11:00",
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
      day1: this.ShowDate(0) + "（今日）",
      day2: this.ShowDate(-1),
      day3: this.ShowDate(-2),
      cities: cityOptions,
      checkboxGroup1: ["上海"],
      radioA: "1",
      radioB: "1",
      radioC: "1",
      radio1: "7:00 ~ 9:00",
      radio2: "7:00 ~ 9:00",
      radio3: "7:00 ~ 9:00",
    };
  },
  mounted() {
    console.log(this.$route.matched);
  },
  methods: {
    submitForm1(formName) {
      this.$message({
        type: "success",
        message: "提交成功!",
      });
    },
    show() {
      console.log(7777777);
      this.$message({
        type: "success",
        message: "提交成功!",
      });
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
    ...mapGetters(["userInfo", "AllSite"]),
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
  margin: 20px 30px;
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
  margin: 20px 50px;
  text-align: left;
  line-height: 30px;
}
.el-button--primary.is-plain {
  float: right;
  margin-right: 70px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>