<template>
  <div>
      <h1 class="one">器材列表</h1>
      <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 40px;float:left"
      @click="show"
      >添加器材</el-button
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {

}
</script>

<style scoped>
.one {
  color: #409eff;
}
</style>