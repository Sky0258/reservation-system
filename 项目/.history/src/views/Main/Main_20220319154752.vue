<template>
  <div>
    <el-container class="home-container">  
      <el-header><Header></Header></el-header>
      <el-container class="home-container">      
        <el-aside class="home-container" width="200px"><Aside></Aside></el-aside>   
        <el-main>
          <common-tab></common-tab>
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
import CommonTab from '../Main/CommonTab.vue'
export default {
  components: {
    Aside,
    Header,
    CommonTab
  },
   mounted(){
    this.$store.dispatch('getUserInfo',{
      Authorization:this.token
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
  padding: 10px 20px;
  padding-bottom: 0px;
}
.home-container {
  height: 100%;
}
</style>