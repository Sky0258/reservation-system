<template>
  <div class="tabs">
    <!--closable这里说明home是不能关闭的-->
    <el-tabs
      id="one"
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="change1"
      size="mini"
    >
      <el-tab-pane
        v-for="(item, index) in tags"
        :key="item.name"
        :label="item.name"
        :name="item.name"
        @change="show"
        size="mini"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import eventBus from '../../store/event-bus'
export default {
  computed: {
    //获取vuex的标签集合数据
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  data() {
    return {
      editableTabsValue: this.$route.name,
    };
  },
  mounted() {
    eventBus.$on('addItem',this.resChange);
  },
  methods: {
    ...mapMutations({
      close: "closeTab",
    }),
    resChange(item){
      this.editableTabsValue = item;
    },
    show(){
      console.log("0909090");
    },
    change1(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
    change(index) {
      this.index1 = index;
      console.log(this.index1);
    },
    //关闭标签
    handleClose(tag, index) {
      let length = this.tags.length - 1;
      //vuex调方法的另一种写法
      this.close(tag);
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return;
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name });
      } else {
        // 否则往右边跳转
        `this.$router.push({ name: this.tags[index].name });`;
      }
    },

    //选择标签跳转路由
    changeMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
      this.editableTabsValue = this.$route.name;
    },
    removeTab(targetName) {
      const length = this.tags.length - 1;
      this.tags.forEach((tab, index) => {
        if (targetName == tab.name) {
          this.close(tab);
          if (tab.name !== this.$route.name) {
            this.editableTabsValue = tab.name;
            return;
          }
          // 关闭的标签是最右边的话，往左边跳转一个
          if (index === length) {
            this.editableTabsValue = this.tags[index - 1].name;
            this.$router.push({ name: this.tags[index - 1].name });
          } else {
            // 否则往右边跳转
            this.editableTabsValue = this.tags[index].name;
            this.$router.push({ name: this.tags[index].name });
          }
        }
      });
      this.editableTabsValue = this.$route.name;
    },
  },
  beforeDestroy(){
    eventBus.$off('addItem',this.resChange)
  }
};
</script>
<style scoped>
#one {
  
}
.el-tabs__item {
  height: 35px;
  line-height: 35px;
  font-size: 13px;
}
</style>