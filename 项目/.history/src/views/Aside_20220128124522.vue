<template>
  <div class="box">
    <el-menu
      
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu :index="item.id + ''" v-for="item in menu" :key="item.id">
        <template slot="title"> 
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.id +''" v-for="subItem in item.children " :key="subItem.id">{{subItem.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>     
    </el-menu>
    <div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      menulist: []
    }
  },
  created() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      await this.$store.dispatch("userMenu", {
        'roleIds' :"1",
      });
    },
  },
  computed:{
    ...mapGetters(['menu'])
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  height: 100vh;
}
.box .el-menu {
  width: 200px;
  height: 100%;
}
</style>