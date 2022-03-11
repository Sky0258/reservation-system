<template>
  <div class="box">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      router
    >
      <el-submenu :index="item.id + ''" v-for="item in menu" :key="item.id" v-if="item.children.length != 0">
        <template slot="title"> 
          <!-- <i class="el-icon-location"></i> -->
          <span style="padding-left: 23px;">{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.id +''" v-for="subItem in item.children " :key="subItem.id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{subItem.name}}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> 
       <el-menu-item :index="specialItem.id + ''" v-for="specialItem in menu" :key="specialItem.id" v-if="specialItem.children.length == 0" >
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title" style="padding-left: 23px;">{{specialItem.name}}</span>
      </el-menu-item>   
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
    // this.getMenuList();
    this.getUserRole();
  },
  methods: {
    
    getUserRole() {
      console.log(this.userInfo.data.userId);
      this.$store
      .dispatch("userRole", {
        userId: this.userInfo.userId
      })
      .then(() => {
        this.$store
      .dispatch("userRole", {
        userId: this.userInfo.userId
      })
      .then(() => {
        
      })
      .catch(() => {
        this.$message.error("错误");
      });
      })
      .catch(() => {
        this.$message.error("错误");
      });
    },

    // async getMenuList() {
    //   await this.$store.dispatch("userMenu", {
    //     'roleIds' :"1",
    //   });
    // },

  },
  computed:{
    ...mapGetters(['menu',"userInfo"]),
    // scrollerHeight: function() {
    //   // console.log(window.innerHeight + 'AAA');
    //   return (window.innerHeight - 60) + 'px';
    // }
    
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  height: 90vh;
}
.box .el-menu {
  width: 200px;
  height: 100%;
}
.box .el-submenu {
  text-align: left;
  /* padding-left: 10px; */
}
.box .el-menu-item{
  text-align: left;
  min-width: 180px;
}
.box .el-menu-vertical-demo .el-submenu >>> .el-submenu__title{
  padding-left: 30px;
}
</style>