<template>
  <div class="box">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409eff"
    >
      <el-submenu :index="item.id + ''" v-for="item in menu" :key="item.id">
        <template slot="title"> 
          <!-- <i class="el-icon-location"></i> -->
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.id +''" v-for="subItem in item.children " :key="subItem.id">
          <template slot="title">
            <i class="el-icon-menu" style="font-size:12px"></i>
            <span>{{subItem.name}}</span>
            </template>
          </el-menu-item>
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
      iconsObj:[]
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
.box .el-submenu {
  text-align: left;
  padding-left: 0px;
}
.box .el-menu-item{
  text-align: left;
}
</style>