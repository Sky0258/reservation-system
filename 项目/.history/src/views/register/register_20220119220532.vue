<template>
  <div>
    <div class="contain">
      <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="名称" >
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>
    </div> 
  </div>
</template>

<script>
export default {
  data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.contain {
  width: 500px;
  height: 1000px;
  border: 1px solid #e0e0e0;
}
/deep/ .el-form-item-label {
  margin-top: 10px;
  font-size: 38px;
}
/deep/ .el-input{
  border: 2px;
}
</style>