<template>
  <div>
    <!-- <el-container style="height:100%">
      <el-aside width="216px" height="100%"> </el-aside>
      <el-container>
        <el-header width=100% height="30px"></el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container> -->

    <el-container>
  <el-header><Header></Header></el-header>
  <el-container>
    <el-aside width="216px"><Aside></Aside></el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import Aside from './Aside.vue'
import Header from './Header.vue'
export default {
    components:{
        Aside,
        Header
    }
};
</script>

<style>
</style>