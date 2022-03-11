<template>
  <div>
    <div class="images">
      <img src="./images/羽毛球场1.jpg" alt="" />
      <img src="./images/羽毛球场2.jpg" alt="" />
      <img src="./images/羽毛球场3.jpg" alt="" />
    </div>
    <el-tabs type="border-card">
      <el-tab-pane :label="day1">
        <div>
          <el-radio-group v-model="radio1">
            <el-radio-button class="contain" v-for="city in cities" :label="city" :key="city">{{city}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio v-model="radioA" label="1">羽毛球场地1</el-radio>
          <el-radio v-model="radioA" label="2">羽毛球场地2</el-radio>
          <el-radio v-model="radioA" label="3">羽毛球场地3</el-radio>
          <el-radio v-model="radioA" label="4">羽毛球场地4</el-radio>
          <el-button type="primary" plain style="float=right">提交预约</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="day2">
        <div>
          <el-radio-group v-model="radio2">
            <el-radio-button class="contain" v-for="city in cities" :label="city" :key="city">{{city}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio v-model="radioB" label="1">羽毛球场地1</el-radio>
          <el-radio v-model="radioB" label="2">羽毛球场地2</el-radio>
          <el-radio v-model="radioB" label="3">羽毛球场地3</el-radio>
          <el-radio v-model="radioB" label="4">羽毛球场地4</el-radio>
          <el-button type="primary" plain style="float=right">提交预约</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="day3">
        <div>
         <el-radio-group v-model="radio3">
            <el-radio-button class="contain" v-for="city in cities" :label="city" :key="city">{{city}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="ground">
          <el-radio v-model="radioC" label="1">羽毛球场地1</el-radio>
          <el-radio v-model="radioC" label="2">羽毛球场地2</el-radio>
          <el-radio v-model="radioC" label="3">羽毛球场地3</el-radio>
          <el-radio v-model="radioC" label="4">羽毛球场地4</el-radio>
          <el-button type="primary" plain style="float=right">提交预约</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const cityOptions = ['7:00 ~ 9:00', '9:00 ~ 11:00', '11:00 ~ 13:00', '13:00 ~ 15:00','15:00 ~ 17:00','17:00 ~ 19:00','19:00 ~ 21:00','21:00 ~ 23:00'];
export default {
  data(){  
    return {
      day1: this.ShowDate(0) + '（今日）',
      day2: this.ShowDate(-1),
      day3: this.ShowDate(-2),
      cities: cityOptions,
      checkboxGroup1: ['上海'],
      radioA: '1',
      radioB: '1',
      radioC: '1',
      radio1: '7:00 ~ 9:00',
      radio2: '7:00 ~ 9:00',
      radio3: '7:00 ~ 9:00',

    }
  },
  methods:{
    submitForm1(formName) {
      this.$message({
        type: "success",
        message: "提交成功!",
      });
    },
    ShowDate(date){
            var num = date
            let n = num;
            let d = new Date();
            let year = d.getFullYear();
            let mon = d.getMonth() + 1;
            let day = d.getDate();
            if(day <= n) {
                if(mon > 1) {
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
            let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
            return s;
    }
  }
}
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
  border-left: 1px solid #DCDFE6;
}
.el-radio-button >>> .el-radio-button__inner {
  border: 1px solid #DCDFE6;
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
</style>