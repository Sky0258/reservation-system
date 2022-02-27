<template>
  <div>
    <div class="images">
      <img src="./images/篮球场1.jpg" alt="" />
      <img src="./images/篮球场2.jpg" alt="" />
      <img src="./images/篮球场3.jpg" alt="" />
    </div>
    <el-tabs type="border-card">
      <el-tab-pane :label="day1">用户管理</el-tab-pane>
      <el-tab-pane :label="day2">配置管理</el-tab-pane>
      <el-tab-pane :label="day3">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data(){  
    return {
      day1: this.ShowDate(0),
      day2:'',
      day3:''
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
</style>