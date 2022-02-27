<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="one">
    <el-tab-pane label="篮球场" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="羽毛球场" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="乒乓球场" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="网球场" name="fourth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="匹克球场" name="fifth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="游泳馆" name="sixth">定时任务补偿</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.one {
  border: 1px solid #e0e0e0;
}
</style>