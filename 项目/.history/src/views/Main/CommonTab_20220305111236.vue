<template>
  <div class="tabs">
    <!--closable这里说明home是不能关闭的-->
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="change1"
    >
      <el-tab-pane
        v-for="(item,index) in tags"
        :key="item.name"
        :label="item.name"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    //获取vuex的标签集合数据
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  data() {
      return {
        editableTabsValue: '2',
        editableTabs:[{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
  },
  mounted:{
    
  },
  methods: {
    ...mapMutations({
      close: "closeTab",
    }),
    change1(item){
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
    change(index){
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
        this.$router.push({ name: this.tags[index].name });
      }
    },

    //选择标签跳转路由
    changeMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
    removeTab(targetName) {
        let length = this.tags.length - 1;
        let tabs = this.tags;
        this.close(targetName);
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.tags = tabs.filter(tab => tab.name !== targetName);
      }
  },
};
</script>
<style scoped>
.el-tag--medium {
  height: 35px;
  line-height: 32px;
  font-size: 14px;
  margin: 5px 5px;
  /* display: inline; */
  float: left;
}
</style>