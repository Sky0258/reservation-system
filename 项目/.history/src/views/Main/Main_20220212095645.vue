<template>
  <div>
    <el-container class="home-container">
      
      <el-aside class="home-container" width="200px"><Aside></Aside></el-aside>
      <el-container class="home-container">
        <el-header><Header></Header></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Aside from "./Aside.vue";
import Header from "./Header.vue";
export default {
  components: {
    Aside,
    Header,
  },
   mounted(){
    this.$store.dispatch('getUserInfo',{
      Authorization:this.token
    });
    this.$store.dispatch("managerInfo", {
      //   userId:this.userInfo.data.userId       （这里这样写就OK了）
      userId: 202041412124,
    });
   },
  computed:{
    ...mapGetters(['token','userInfo']),
  }
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
.home-container {
  height: 100%;
}
</style>