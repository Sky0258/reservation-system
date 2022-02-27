<template>
  <div>
    <div class="images">
      <img src="./images/篮球场1.jpg" alt="" />
      <img src="./images/篮球场2.jpg" alt="" />
      <img src="./images/篮球场3.jpg" alt="" />
    </div>
    <el-tabs type="border-card">
      <el-tab-pane :label="day1">
        <div>
          <el-checkbox-group class="title" v-model="checkboxGroup1">
            <el-checkbox-button class="contain" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="day2">
        <div>
          <el-checkbox-group class="title" v-model="checkboxGroup1">
            <el-checkbox-button class="contain" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="checked">备选项</el-checkbox>
        <el-checkbox v-model="checked">备选项</el-checkbox>
        <el-checkbox v-model="checked">备选项</el-checkbox>
        <el-checkbox v-model="checked">备选项</el-checkbox>
      </el-tab-pane>
      <el-tab-pane :label="day3">
        <div>
          <el-checkbox-group class="title" v-model="checkboxGroup1">
            <el-checkbox-button class="contain" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
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
    }
  },
  methods:{
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
.title {
  border: 0;
}
.contain {
  margin: 20px 30px;
}
.el-checkbox-button:first-child >>> .el-checkbox-button__inner {
  border-left: 1px solid #DCDFE6;
}
.el-checkbox-button >>> .el-checkbox-button__inner {
  border: 1px solid #DCDFE6;
  width: 150px;
  height: 55px;
  font-size: 17px;
  line-height: 30px;
  border-radius: 10px;
}
</style>