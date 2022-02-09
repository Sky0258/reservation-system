<template>
  <div>
    <div class="contain">
      <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="姓名" id="one">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="">
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
#one >>> .el-form-item__label {
  font-size: 17px;
}
.el-form-item {
  margin-top: 10px;
  font-size: 38px;
}
.el-input{
  border: 2px;
}
</style>