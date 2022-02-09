<template>
  <div>
    <el-container style="height:100%">
      <el-aside width="216px" height="100%"><Aside></Aside> </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../Aside.vue'
export default {
    components:{
        Aside
    }
};
</script>

<style>
</style>