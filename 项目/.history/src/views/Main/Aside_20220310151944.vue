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
      <el-submenu
        :index="item.id + ''"
        v-for="item in menu"
        :key="item.id"
        v-if="item.children.length != 0"
        @click="clickMenu(item)"
      >
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span style="padding-left: 23px">{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.id + ''"
            v-for="subItem in item.children"
            :key="subItem.id"
            @click="clickMenu(subItem)"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.name }}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        :index="specialItem.id + ''"
        v-for="specialItem in menu"
        :key="specialItem.id"
        v-if="specialItem.children.length == 0"
        @click="clickMenu(specialItem)"
      >
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title" style="padding-left: 23px">{{
          specialItem.name
        }}</span>
      </el-menu-item>
    </el-menu>
    <div></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      iconsObj: [],
    };
  },
  created() {
    // this.getMenuList();
    this.getUserRole();
  },
  methods: {
    clickMenu(item) {
      //调用vuex的selectMenu方法存储数据
      this.$store.commit("selectMenu", item);
      //跳转路由
      this.$router.push({ name: item.name });
    },
    async getUserRole() {
      const arr = [];
      let userId = this.userInfo.data.userId;
      console.log(userId);
      await this.$store
        .dispatch("userRole", userId)
        .then(() => {
          for (let index in this.role) {
            // console.log(index);
            arr.push(this.role[index].id);
          }
          console.log(arr);
          var str = arr.join(",");
          this.$store
            .dispatch("userMenu", {
              roleIds: str,
            })
            .then(() => {
              console.log(userId);
            })
            .catch(() => {
              this.$message.error("错误");
            });
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
  },
  computed: {
    ...mapGetters(["menu", "userInfo", "role"]),
    // scrollerHeight: function() {
    //   // console.log(window.innerHeight + 'AAA');
    //   return (window.innerHeight - 60) + 'px';
    // }
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
  },
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
.box .el-menu-item {
  text-align: left;
  min-width: 180px;
}
.box .el-menu-vertical-demo .el-submenu >>> .el-submenu__title {
  padding-left: 30px;
}
</style>