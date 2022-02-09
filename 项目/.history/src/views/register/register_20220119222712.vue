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
      <el-form-item label="学号" id="one">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="班级" id="one">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" id="one">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
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