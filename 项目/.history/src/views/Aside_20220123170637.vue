<template>
  <div>
   <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">篮球场</el-menu-item>
          <el-menu-item index="1-2">羽毛球场</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="1-4">乒乓球场</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">网球场</template>
        </el-submenu>
        <el-submenu index="1-4">
          <template slot="title">网球场</template>
        </el-submenu>
        <el-submenu index="1-4">
          <template slot="title">网球场</template>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>