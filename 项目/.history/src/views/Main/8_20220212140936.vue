<template>
  <div>
      <div class="images">
        <img src="./images/篮球场1.jpg" alt="">
        <img src="./images/篮球场2.jpg" alt="">
        <img src="./images/篮球场3.jpg" alt="">
      </div>
      <el-tabs type="border-card" style="width=700px">
  <el-tab-pane label="用户管理">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
  </div>
</template>

<script>
export default {

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