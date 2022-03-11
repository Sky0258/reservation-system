<template>
  <div class="tabs">
    <!-- :closable="tag.name !== 'home'" tag标签为home时不显示关闭按钮 -->
    <el-tag size="small" :key="tag.name" v-for="tag in tags" :closable="tag.name !== 'home'" :disable-transitions="false" @close="handleClose(tag)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
// 引入vuex模块
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    // 使用vuex中state管理的tabsList数组对象数据
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations({
      close: 'closeTab'
    }),
    // 通过事件绑定方法，当用户点击关闭时将tab作为参数传递给close方法，通过close方法调用vuex中的closeTab方法
    handleClose(tag) {
      this.close(tag)
    }
  }
}
</script>

<style scoped>
// 设置tag标签样式
.tabs {
  padding: 20px;
}
.el-tag {
    margin-right: 15px;
}
</style>

