<template>
  <div class="tabs">
    <!--closable这里说明home是不能关闭的-->
    <el-tabs type="card" >
    <el-tab-pane
      :key="tag.name"
      size="medium"
      v-for="(tag, index) in tags"
      
      @tab-remove="handleClose(tag, index)"
      @tab-click="changeMenu(tag)"
      :label="tag.name"
      :closable="tag.name !== 'home'"
      :disable-transitions="false" 
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
    </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
      //获取vuex的标签集合数据
    ...mapState({
      tags: state => state.tab.tabsList,
    })
  },
  data(){
    return{
      editableTabs:this.tags
    }
  },
  methods: {
    ...mapMutations({
      close: 'closeTab'
    }),
    //关闭标签
    handleClose(tag, index) {
      let length = this.tags.length - 1
      //vuex调方法的另一种写法
      this.close(tag)
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        // 否则往右边跳转
        this.$router.push({ name: this.tags[index].name })
      }
    },

    //选择标签跳转路由
    changeMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    },
    handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tags, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
  }

}
</script>

<style scoped>
.el-tag--medium{
  /* height: 35px; */
  line-height: 32px;
  font-size: 14px;
  margin: 5px 5px;
}
</style>