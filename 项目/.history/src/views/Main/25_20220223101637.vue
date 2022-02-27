<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="one">
    <el-tab-pane label="篮球场" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
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