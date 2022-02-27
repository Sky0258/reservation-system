<template>
  <div>
    <el-card class="box-card" style="width: 90%;margin: 0 auto">
      <div slot="header" class="clearfix">
        <span style="float: left">标题：{{ ruleForm.title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ "列表内容 " + o }}
      </div>
    </el-card>
    <el-col :span="8">
    <el-card shadow="hover">
      鼠标悬浮时显示
    </el-card>
  </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        title: 111
      },
    };
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>