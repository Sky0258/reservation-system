<template>
  <div class="box">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>     
    </el-menu>
    <div>
      <!-- <button @click="creat()">点击我</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: []
    }
  },
  created() {
    this.getMenuList();
  }
  methods: {
    creat() {
      const { 'roleIds': id } = this;
      this.$store.dispatch("userMenu", {
        'roleIds' :"1",
      });
    },
  },
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