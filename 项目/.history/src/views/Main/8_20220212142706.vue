<template>
  <div>
      <div class="images">
        <img src="./images/篮球场1.jpg" alt="">
        <img src="./images/篮球场2.jpg" alt="">
        <img src="./images/篮球场3.jpg" alt="">
      </div>
      <el-tabs type="border-card">
  <el-tab-pane :label="day1">用户管理</el-tab-pane>
  <el-tab-pane label="day2">配置管理</el-tab-pane>
  <el-tab-pane label="day3">角色管理</el-tab-pane>
</el-tabs>
  </div>
</template>

<script>
export default {
  data(){
    mounted:{
          var now = new Date();
          var year = now.getFullYear(); //得到年份
          var month = now.getMonth(); //得到月份
          var day = now.getDate(); //得到天
          if (day < 10) {
            day = "0" + day
          }
          month = month + 1;
    }
    return {
      day1: this.month
    }
  },
  
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