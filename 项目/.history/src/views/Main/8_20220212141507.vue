<template>
  <div>
      <div class="images">
        <img src="./images/篮球场1.jpg" alt="">
        <img src="./images/篮球场2.jpg" alt="">
        <img src="./images/篮球场3.jpg" alt="">
      </div>
      <el-tabs type="border-card" style="width=200px">
  <el-tab-pane label="day1">用户管理</el-tab-pane>
  <el-tab-pane label="day2">配置管理</el-tab-pane>
  <el-tab-pane label="day3">角色管理</el-tab-pane>
</el-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return {
      day1:
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