<template>
  <div>
    <el-container height="100%">
      <el-header><Header></Header></el-header>
      <el-container height="100%">
        <el-aside width="216px"><Aside></Aside></el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
import Header from "./Header.vue";
export default {
  components: {
    Aside,
    Header,
  },
};
</script>

<style scoped>
.el-header {
  background-color: #505963;
}
.el-aside::-webkit-scrollbar {
     display: none;
}
.el-main {
  padding: 10px;
  padding-bottom: 0px;
}
</style>