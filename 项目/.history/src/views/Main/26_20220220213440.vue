<template>
  <div>
      <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 40px;float:left"
      @click="show"
      >添加器材</el-button
    >
    <h1 class="one">器材列表</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {

}
</script>

<style scoped>
h1 {
  color: #409eff;
  float: left;
}
</style>